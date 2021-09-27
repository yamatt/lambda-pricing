const calcform_el = document.querySelector("#calc");

// update values from querystring once page loads
window.addEventListener("load", (e) => {
  const querystring = new URLSearchParams(window.location.search);

  querystring.forEach((value, key) => {
    calcform_el[key].value = value;
  })

  calcform_el.memory_display.value=calcform_el.memory.value;

  if (querystring.has("free")) {
    calcform_el.free.checked = true
  }
  else {
    calcform_el.free.checked = false
  }
  calcform_el.result.value = calculate(calcform_el);
});

calcform_el.addEventListener("input", (e) => {
  e.currentTarget.result.value = calculate(e.currentTarget);
  const querystring = new URLSearchParams(new FormData(calcform_el)).toString();
  history.replaceState({}, null, "?" + querystring.toString())
});

function calculate(form) {
    var run_lengthp = form.runtime.value * form.runsp.value * form.timeunit.value;
    var gb = form.memory.value / 1024;

    var total_compute = run_lengthp * gb; // GB-s

    if (form.free.checked) {
        total_compute -= form.dataset.freetier;
    }

    if (total_compute < 0.01) {
        return "Nothing"
    }

    return format(total_compute * form.dataset.computeprice);
}

function format(price) {
    return "$" + price.toFixed(2);
}
