export default (results) => {
    const today = new Date();
    let yesterday = today.setDate(today.getDate() - 1);
    yesterday = new Date(yesterday);
    let lastWeek = today.setDate(today.getDate() - 3);
    lastWeek = new Date(lastWeek);
    const cost = results.reduce((acc, val) => acc + val?.cost, 0);
    const costlastWeek = results.reduce((acc, val) => (new Date(val?.createdAt) > lastWeek ? acc + val?.cost : 0), 0);
    const countYesterday = results.reduce((acc, val) => (new Date(val?.createdAt) > today ? acc + 1 : 0), 0);
    const inputTokens = results.reduce((acc, val) => (val?.inputTokens ? acc + val?.inputTokens : 0), 0);
    const inputTokensLastWeek = results.reduce((acc, val) => (val?.inputTokens && new Date(val?.createdAt) > lastWeek ? acc + val?.inputTokens : 0 ? val?.inputTokens : 0), 0);
    const outputTokens = results.reduce((acc, val) => (val?.outputTokens ? acc + val?.outputTokens : 0), 0);
    const outputTokensLastWeek = results.reduce((acc, val) => (new Date(val?.createdAt) > lastWeek && val?.outputTokens ? acc + val?.outputTokens : 0), 0);
    const _agg = {
        count: results.length,
        countYesterday: countYesterday,
        cost: cost.toFixed(2).toLocaleString('en-US', {
            minimumFractionDigits: 2
        }),
        costLatest: ((costlastWeek / cost) * 100).toFixed(2).toLocaleString('en-US', {
            minimumFractionDigits: 2
        }),
        inputTokens: inputTokens.toLocaleString('en-US', {
            minimumFractionDigits: 0
        }),
        inputTokensLastWeek: inputTokensLastWeek.toLocaleString('en-US', {
            minimumFractionDigits: 0
        }),
        outputTokens: outputTokens.toLocaleString('en-US', {
            minimumFractionDigits: 0
        }),
        outputTokensLastWeek: outputTokensLastWeek.toLocaleString('en-US', {
            minimumFractionDigits: 0
        })
    };

    return _agg;
};
