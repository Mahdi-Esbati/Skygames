var editedCMNT;
var acceptedCMNT;
function delete_checks() {
  $(".mainchk").prop("checked", false);
}

function delete_items(items) {
  for (var i = 0; i < items.length; i++) {
    $("#td" + items[i]).fadeOut(300, function(){ $(this).remove();});
  }
}

function edit_items(items,comment) {
  for (var i = 0; i < items.length; i++) {
    $("#desc" + items[i]).html(comment);
  }
}
function accept_items(items) {
  for (var i = 0; i < items.length+1; i++) {
    if ($("#confirmed"+items[i]).hasClass("not-confirmed")) {
      $("#confirmed" + items[i]).addClass('confirmed').removeClass('not-confirmed');
      $("#confirmed" + items[i]).html("تایید شده");
    }
    else{
      $("#confirmed" + items[i]).addClass('not-confirmed').removeClass('confirmed');
      $("#confirmed" + items[i]).html("تایید نشده");
    }
  }
  }

  $(function () {
    delete_checks();
    var selectedItems = new Array();
    $("input[type='checkbox']").on('click', function () {
      if (this.checked) {
        selectedItems.push(this.id);
        for (var i = 0; i < selectedItems.length; i++) {
          console.log(i + " = " + selectedItems[i]);
        }
      }
      else {
        var index = selectedItems.indexOf(this);
        selectedItems.splice(index, 1);
        for (var i = 0; i < selectedItems.length; i++) {
          console.log(i + " = " + selectedItems[i]);
        }
      }
    });


    $('#accept').on('click', function () {
      $.ajax('comment-actions.php', {
        type: 'post',
        data: {
          action: 'accept',
          items: selectedItems
        },
        success: function (data) {
          swal({
            title: "کامنت های مورد نظر شما تایید شدند ",
            text: "شماره ی کامنت های شما   \n" + data,
            type: "success",
            confirmButtonText: "تایید"
          });
          delete_checks();
          accept_items(selectedItems);
          selectedItems=[];
        }
      });

    });

    $('#delete').on('click', function () {
      $.ajax('comment-actions.php', {
        type: 'post',
        data: {
          action: 'delete',
          items: selectedItems
        },
        success: function (data) {
          swal({
            title: "کامنت های مورد نظر شما حذف شدند",
            text: "شماره ی کامنت های شما   \n" + data,
            type: "error",
            confirmButtonText: "تایید"
          });
          delete_checks();
          delete_items(selectedItems);
          selectedItems=[];
        }
      });

    });

    $('#edit').on('click', function () {
      var commenttext = "NOTHING";
      var sdsd =  $("#desc" + selectedItems[0]).val();
      swal({
          title: sdsd+"ویرایش",
          text: "متن کامنت های ویرایش شده را بنویسید",
          type: "input",
          inputValue : sdsd ,
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "متن کامنت"
        },
        function (inputValue) {
          if (inputValue === false) return false;

          if (inputValue === "") {
            swal.showInputError("شما باید چیزی بنویسید");
            return false
          }

          commenttext=inputValue;
          $.ajax('comment-actions.php', {
            type: 'post',
            data: {
              action: 'edit',
              items: selectedItems,
              cmnt_desc: inputValue
            },
            success: function (data) {
              swal({
                title: "کامنت های مورد نظر شما ویرایش شدند",
                text: "شماره ی کامنت های شما   \n" + data,
                type: "success",
                confirmButtonText: "تایید"
              });
              delete_checks();
              edit_items(selectedItems,commenttext)
              selectedItems=[];
            }
          });

        });


    });

  });