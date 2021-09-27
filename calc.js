const calcform_el = document.querySelector("#calc");

calcform_el.addEventListener("input", (e) => {
  e.currentTarget.result.value = calculate(e.currentTarget);
});

calcform_el.querySelectorAll("input, select").forEach(function(el) {
  el.addEventListener("blur", (e) => {
    const querystring = new URLSearchParams(new FormData(calcform_el)).toString();
    console.log(querystring)
  });
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
