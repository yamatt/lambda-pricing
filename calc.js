function calculate(form) {
    var run_lengthpm = form.runtime.value * form.runspm.value;
    var gb = form.memory.value / 1024;

    var total_compute = run_lengthpm * gb; // GB-s

    if (form.free.checked) {
        total_compute -= form.dataset.freetier;
    }

    if (total_compute <= 0) {
        return "Nothing"
    }

    return format(total_compute * form.dataset.computeprice);
}

function format(price) {
    return "$" + price.toFixed(2);
}
