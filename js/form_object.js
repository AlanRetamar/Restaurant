$.fn.formObject = function () {
  let form = {}
  const fields = $(":input").serializeArray();
  $.each(fields, (i, field) => {
    console.log(i)
    form[field.name] = field.value || ""
  })
  return form
}