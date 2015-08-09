
function vendor(param)
{
  
   console.log("vendor.js  -0--");

  
    var postData={title:"jayamma",city:"kuruva"};
    var url = "/vendor/list/";
    url = url + param;
    console.log(url);
    $.get(url,
      postData,
      function(data, textStatus, jqXHR)
      {
       console.log("vl 1")
        var trHTML = '';
        $.each(data, function (i, item) {

           if(item.customer != null)
              trHTML += '<tr><td>' + item.customer.name + '</td><td>' + item.customer.email + '</td><td>' + item.customer.phone + '</td>';
            if(item.menu != null)
              trHTML += '<td>' + item.menu.name + '</td><td>'+item.menu.no_of_order + '</td></tr>';
         //    trHTML +='/tr';  
        });
        $('#t02').append(trHTML);
          //data - JSON object from server.
      },"json").fail(function(jqXHR, textStatus, errorThrown) 
          {
    console.log(textStatus);
    console.log(errorThrown); 
      });
  //  });
}
