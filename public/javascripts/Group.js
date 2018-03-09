$('#create-group').click(()=>{
    let input = {
        title : $('#group').val(),
        language: $('#language').val()
    }
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/api/groups/add",
        data: input,
        dataType:'json',
        success: function(respon){
            window.location.href = '/groups' 
        }
    })
})

$.ajax({
    method: "GET",
    url: "http://localhost:3000/api/groups",
    dataType: "json",
    success : function(respon){
        respon.forEach(data=>{
            $('#grouplist').prepend(`
            <li class="collection-item avatar">
            <span class="title">${data.title}</span>
            <p>defaultf language : ${data.language}</p>
            <a href="/message/${data._id}" class="secondary-content"><i class="material-icons">input</i></a>
          </li>
            `)
        })
        }
    });

