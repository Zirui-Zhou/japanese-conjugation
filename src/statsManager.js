"use strict";

const STATS_KEY = "statsHistory";
const MAX_TIME = 60000;
const MAX_RECORDS = 10000;
const WRONG_TO_SHOW = 20;
const DAILY_TABLE_LIMIT = 30;

let activeCharts = [];

export function destroyStatsCharts() {
    activeCharts.forEach((c) => c.destroy());
    activeCharts = [];
}

export function recordAttempt(wordType, conjType, correct, timeSpent) {
    const history = getHistory();
    history.push({
        ts: Date.now(),
        wordType,
        conjType,
        correct,
        timeSpent: Math.min(Math.round(timeSpent), MAX_TIME),
    });
    if (history.length > MAX_RECORDS) {
        history.splice(0, history.length - MAX_RECORDS);
    }
    saveHistory(history);
}

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(STATS_KEY)) || [];
    } catch {
        return [];
    }
}

function saveHistory(h) {
    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(h));
    } catch {
        // localStorage full or unavailable
    }
}

function toDateKey(ts) {
    const d = new Date(ts);
    return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
    );
}

function wordTypeToLabel(type) {
    const map = {
        u: "五段动词",
        ru: "一段动词",
        irv: "サ変/カ変動詞",
        irg: "不規則動詞",
        i: "い形容词",
        na: "な形容词",
        ira: "不规则形容词",
    };
    return map[type] || type;
}

function computeStats() {
    const history = getHistory();
    if (!history.length) return null;

    const total = history.length;
    const correct = history.filter((r) => r.correct).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const totalTime = history.reduce((s, r) => s + r.timeSpent, 0);
    const avgTime = total > 0 ? totalTime / total / 1000 : 0;

    const daySet = new Set(history.map((r) => toDateKey(r.ts)));
    const daysPracticed = daySet.size;

    // Per conjugation type
    const conjTypeMap = {};
    for (const r of history) {
        if (!conjTypeMap[r.conjType]) {
            conjTypeMap[r.conjType] = { total: 0, correct: 0 };
        }
        conjTypeMap[r.conjType].total++;
        if (r.correct) conjTypeMap[r.conjType].correct++;
    }

    // Per word type
    const wordTypeMap = {};
    for (const r of history) {
        if (!wordTypeMap[r.wordType]) {
            wordTypeMap[r.wordType] = { total: 0, correct: 0 };
        }
        wordTypeMap[r.wordType].total++;
        if (r.correct) wordTypeMap[r.wordType].correct++;
    }

    // Daily breakdown
    const dailyMap = {};
    for (const r of history) {
        const dk = toDateKey(r.ts);
        if (!dailyMap[dk]) {
            dailyMap[dk] = { total: 0, correct: 0, totalTime: 0 };
        }
        dailyMap[dk].total++;
        if (r.correct) dailyMap[dk].correct++;
        dailyMap[dk].totalTime += r.timeSpent;
    }

    const dailyKeys = Object.keys(dailyMap).sort();
    const dailyStats = {};
    const dailyDetailList = [];
    for (const dk of dailyKeys) {
        const d = dailyMap[dk];
        dailyStats[dk] = {
            total: d.total,
            accuracy: (d.correct / d.total) * 100,
        };
        dailyDetailList.push({
            date: dk,
            total: d.total,
            correct: d.correct,
            accuracy: (d.correct / d.total) * 100,
            avgTime: d.totalTime / d.total / 1000,
        });
    }

    // Wrong answers
    const wrongAnswers = history
        .filter((r) => !r.correct)
        .reverse()
        .slice(0, WRONG_TO_SHOW);
    const wrongList = wrongAnswers.map((r) => ({
        ts: r.ts,
        wordType: wordTypeToLabel(r.wordType),
        conjType: r.conjType,
    }));

    return {
        total,
        correct,
        accuracy,
        avgTime,
        daysPracticed,
        conjTypeMap,
        wordTypeMap,
        dailyStats,
        dailyDetailList,
        wrongList,
    };
}

// ---- Chart creation helpers ----

function createCorrectDonut(total, correct) {
    const canvas = document.getElementById("stats-donut-chart");
    if (!canvas) return;
    const incorrect = total - correct;
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["正确", "错误"],
            datasets: [
                {
                    data: [correct, incorrect],
                    backgroundColor: [
                        "rgba(75,192,75,0.8)",
                        "rgba(218,5,5,0.6)",
                    ],
                    borderColor: "rgb(44,43,41)",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: { color: "rgb(232,232,232)", padding: 16 },
                },
            },
        },
    });
    activeCharts.push(chart);
}

function createConjTypeChart(conjTypeMap) {
    const entries = Object.entries(conjTypeMap).sort(
        (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total
    );
    const labels = entries.map((e) => e[0]);
    const accuracies = entries.map((e) => (e[1].correct / e[1].total) * 100);
    const bgColors = accuracies.map((a) =>
        a >= 80
            ? "rgba(75,192,75,0.7)"
            : a >= 50
            ? "rgba(255,196,57,0.7)"
            : "rgba(218,5,5,0.7)"
    );

    const canvas = document.getElementById("stats-conj-chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "正确率 (%)",
                    data: accuracies,
                    backgroundColor: bgColors,
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.raw.toFixed(1) + "%",
                    },
                },
            },
            scales: {
                x: { max: 100, ticks: { callback: (v) => v + "%" } },
            },
        },
    });
    activeCharts.push(chart);
}

function createWordTypeChart(wordTypeMap) {
    const entries = Object.entries(wordTypeMap)
        .map((e) => ({
            label: wordTypeToLabel(e[0]),
            accuracy: (e[1].correct / e[1].total) * 100,
            total: e[1].total,
        }))
        .sort((a, b) => a.accuracy - b.accuracy);

    if (entries.length === 0) return;
    const labels = entries.map((e) => e.label);
    const accuracies = entries.map((e) => e.accuracy);
    const bgColors = accuracies.map((a) =>
        a >= 80
            ? "rgba(75,192,75,0.7)"
            : a >= 50
            ? "rgba(255,196,57,0.7)"
            : "rgba(218,5,5,0.7)"
    );

    const canvas = document.getElementById("stats-wordtype-chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "正确率 (%)",
                    data: accuracies,
                    backgroundColor: bgColors,
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.raw.toFixed(1) + "%",
                    },
                },
            },
            scales: {
                x: { max: 100, ticks: { callback: (v) => v + "%" } },
            },
        },
    });
    activeCharts.push(chart);
}

function createDailyChart(dailyStats) {
    const keys = Object.keys(dailyStats).sort();
    if (keys.length < 2) return;

    const canvas = document.getElementById("stats-daily-chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: keys,
            datasets: [
                {
                    label: "答题数",
                    data: keys.map((k) => dailyStats[k].total),
                    backgroundColor: "rgba(255,196,57,0.6)",
                    yAxisID: "y",
                },
                {
                    label: "正确率 (%)",
                    data: keys.map((k) => dailyStats[k].accuracy),
                    type: "line",
                    borderColor: "rgb(0,180,240)",
                    backgroundColor: "rgba(0,180,240,0.1)",
                    yAxisID: "y1",
                    tension: 0.3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: "rgb(232,232,232)" },
                },
            },
            scales: {
                y: {
                    type: "linear",
                    position: "left",
                    title: { display: true, text: "答题数" },
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                },
                y1: {
                    type: "linear",
                    position: "right",
                    title: { display: true, text: "正确率 (%)" },
                    max: 100,
                    grid: { drawOnChartArea: false },
                },
            },
        },
    });
    activeCharts.push(chart);
}

// ---- Render ----

export function renderStatsView() {
    destroyStatsCharts();
    const stats = computeStats();
    const container = document.getElementById("stats-content");
    if (!container) return;

    if (!stats) {
        container.innerHTML =
            '<p class="stats-empty">暂无统计数据。开始练习后将在此显示您的学习统计。</p>';
        return;
    }

    const avgTimeDisplay =
        stats.avgTime < 1
            ? (stats.avgTime * 1000).toFixed(0) + " 毫秒"
            : stats.avgTime.toFixed(1) + " 秒";

    const conjEntries = Object.entries(stats.conjTypeMap).sort(
        (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total
    );
    const wordTypeEntries = Object.entries(stats.wordTypeMap);
    const hasConjData = conjEntries.length > 0;
    const hasWordTypeData = wordTypeEntries.length > 1;
    const hasDailyData = Object.keys(stats.dailyStats).length >= 2;
    const dailyList = [...stats.dailyDetailList].reverse().slice(0, DAILY_TABLE_LIMIT);

    let html = "";

    // Overview cards (2x2 grid)
    html += '<div class="stats-cards">';
    html +=
        '<div class="stats-card"><p class="stats-card-value">' +
        stats.total +
        '</p><p class="stats-card-label">总答题数</p></div>';
    html +=
        '<div class="stats-card"><p class="stats-card-value">' +
        stats.accuracy.toFixed(1) +
        '%</p><p class="stats-card-label">正确率</p></div>';
    html +=
        '<div class="stats-card"><p class="stats-card-value">' +
        avgTimeDisplay +
        '</p><p class="stats-card-label">平均用时</p></div>';
    html +=
        '<div class="stats-card"><p class="stats-card-value">' +
        stats.daysPracticed +
        '</p><p class="stats-card-label">练习天数</p></div>';
    html += "</div>";

    // Row: donut chart + word type chart side by side
    html += '<div class="stats-row">';

    // Donut chart
    html += '<div class="stats-chart-container stats-half">';
    html += "<h3>正确 / 错误</h3>";
    html +=
        '<div class="stats-chart-wrapper stats-donut-wrapper"><canvas id="stats-donut-chart"></canvas></div>';
    html += "</div>";

    // Word type chart
    html += '<div class="stats-chart-container stats-half">';
    html += "<h3>各词类正确率</h3>";
    if (hasWordTypeData) {
        html +=
            '<div class="stats-chart-wrapper"><canvas id="stats-wordtype-chart"></canvas></div>';
    } else {
        html +=
            '<p class="stats-empty" style="padding:1rem">需要更多词类数据</p>';
    }
    html += "</div>";

    html += "</div>";

    // Conjugation type chart
    if (hasConjData) {
        html += '<div class="stats-chart-container">';
        html += "<h3>各变位类型正确率</h3>";
        html +=
            '<div class="stats-chart-wrapper"><canvas id="stats-conj-chart"></canvas></div>';
        html += "</div>";
    }

    // Daily activity chart
    if (hasDailyData) {
        html += '<div class="stats-chart-container">';
        html += "<h3>每日活动</h3>";
        html +=
            '<div class="stats-chart-wrapper"><canvas id="stats-daily-chart"></canvas></div>';
        html += "</div>";
    }

    // Daily detail table
    if (dailyList.length > 0) {
        html += '<div class="stats-chart-container">';
        html += "<h3>每日明细</h3>";
        html += '<div class="stats-daily-table-wrap"><table class="stats-daily-table">';
        html +=
            "<thead><tr><th>日期</th><th>答题数</th><th>正确数</th><th>正确率</th><th>平均用时</th></tr></thead><tbody>";
        for (const d of dailyList) {
            const timeStr =
                d.avgTime < 1
                    ? (d.avgTime * 1000).toFixed(0) + "ms"
                    : d.avgTime.toFixed(1) + "s";
            html +=
                "<tr><td>" +
                d.date +
                "</td><td>" +
                d.total +
                "</td><td>" +
                d.correct +
                "</td><td>" +
                d.accuracy.toFixed(1) +
                "%</td><td>" +
                timeStr +
                "</td></tr>";
        }
        html += "</tbody></table></div>";
        html += "</div>";
    }

    // Wrong answers list
    html += '<div class="stats-wrong-list"><h3>最近错误</h3>';
    if (stats.wrongList.length === 0) {
        html +=
            '<p class="stats-empty" style="padding:0.5rem">暂无错误，继续保持！</p>';
    } else {
        for (const w of stats.wrongList) {
            const dateStr = toDateKey(w.ts);
            html +=
                '<div class="stats-wrong-item"><span>' +
                w.wordType +
                '</span><span class="wrong-conj-type">' +
                w.conjType +
                " · " +
                dateStr +
                "</span></div>";
        }
    }
    html += "</div>";

    container.innerHTML = html;

    // Create charts after DOM update
    createCorrectDonut(stats.total, stats.correct);
    if (hasWordTypeData) {
        createWordTypeChart(stats.wordTypeMap);
    }
    if (hasConjData) {
        createConjTypeChart(stats.conjTypeMap);
    }
    if (hasDailyData) {
        createDailyChart(stats.dailyStats);
    }
}

export function clearStats() {
    destroyStatsCharts();
    localStorage.removeItem(STATS_KEY);
}
