exports.getDate = function() {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date();
    var dateToday = date.toLocaleDateString('en-IN', options);
    return dateToday;
}
