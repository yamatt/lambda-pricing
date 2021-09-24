const calcform_el = document.querySelector("#calc");
const calcoutput_el = document.querySelector("#outputvalue");
const timeunit_el = document.querySelector("#timeunit");

calcform_el.addEventListener("input", (e) => {
  calcoutput_el.value = calculate(e.target);
})

function calculate(form) {
    var run_lengthp = form.runtime.value * form.runsp.value * form.timeunit.value;
    var gb = form.memory.value / 1024;

    var total_compute = run_lengthp * gb; // GB-s

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
