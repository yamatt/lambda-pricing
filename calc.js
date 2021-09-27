const calcform_el = document.querySelector("#calc");

window.addEventListener("load", (e) => {
  const querystring = new URLSearchParams(window.location.search);

  querystring.forEach((e) => {
    console.log(key);
    calcform_el.elements[key].value = querystring.get(key)
  })

  if (querystring.has("free")) {
    calcform_el.free.checked = true
  }
  else {
    calcform_el.free.checked = false
  }
  calculate(calcform_el);
});

calcform_el.addEventListener("input", (e) => {
  e.currentTarget.result.value = calculate(e.currentTarget);
});

calcform_el.querySelectorAll("input, select").forEach((el) => {
  el.addEventListener("blur", (e) => {
    const querystring = new URLSearchParams(new FormData(calcform_el)).toString();
    history.replaceState({}, null, "?" + querystring.toString())
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
