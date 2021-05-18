$(function () {
    GetAll();
    $("#recipes").on("click", ".btn-danger", DelProd);
    $("#btn").click(AddProd);
    $("#recipes").on("click", ".btn-warning", EditProd);
    $("#btnGetSingle").click(getOneProd);

    $("#saveBtn").click(function () {
        var name = $("#NameId").val();
        var price = $("#PriceId").val();
        var color = $("#ColorId").val();
        var department = $("#DepartmentId").val();
        var description = $("#DescriptionId").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products",
            method: "POST",
            data: { name, price, color, department, description },
            success: function (result) {
                console.log(result);
                GetAll();
                $("#postModal").modal("hide");
            },
        });
    });


    $("#UpdateSaveBtn").click(function () {
        var id = $("#updateId").val();
        var name = $("#UpdateNameId").val();
        var price = $("#UpdatePriceId").val();
        var color = $("#UpdateColorId").val();
        var department = $("#UpdateDepartmentId").val();
        var description = $("#UpdateDescriptionId").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/" + id,
            data: { name, price, color, department, description },
            method: "PUT",
            success: function () {

                GetAll();
                $("#updateModal").modal("hide");
            }
        });
    });
});

function GetAll() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        success: function (result) {
            var req = $("#recipes");
            console.log(result);

            req.empty();
            for (let i = 0; i < result.length; i++) {
                var rec = result[i];
                req.append(`
              <div class="product" data-id="${rec._id}">
               <button class="btn btn-danger float-right">Delete</button> 
               <button class="btn btn-warning float-right">Update</button>
               <h3>Name:</h3><p>${rec.name}</p>
               <h3>Price:</h3><p>${rec.price}<p>
               <h3>Color:</h3><p>${rec.color}<p>
               <h3>Department:</h3><p>${rec.department}</p>
               <h3>Description:</h3><p>
                ${rec.description}</p>
              </div>`);
            }
        },
    });
}

function getOneProd(){
    fetch('https://usman-recipes.herokuapp.com/api/products')
        .then( (apidata) =>{
          return apidata.json();

        }).then((orignaldata)=>{

            console.log(orignaldata[0])
        })
}

function AddProd() {
    $("#postModal").modal("show");
}

function DelProd() {
    var btn = $(this);
    var parent = btn.closest(".product");
    let id = parent.attr("data-id");
    console.log(id);

    $.ajax({

        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "DELETE",
        success: function () {
            GetAll();
        },
    });
}

function EditProd() {
    var btn = $(this);
    var parent = btn.closest(".product");
    let id = parent.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/products/" + id, function (result) {

        $("#updateId").val(result._id);
        $("#UpdateNameId").val(result.name);
        $("#UpdatePriceId").val(result.price);
        $("#UpdateColorId").val(result.color);
        $("#UpdateDepartmentId").val(result.department);
        $("#UpdateDescriptionId").val(result.description);
        $("#updateModal").modal("show");
    });
}
