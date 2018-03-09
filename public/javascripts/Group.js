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
            <li class="collection-item avatar group-${data._id}">
                <i class="material-icons circle red">chat</i>
                <span class="title">${data.title}</span>
                <p>defaultf language : ${data.language}</p>
                <div class = "secondary-content">
                    <a id = "delete" onclick="deleteMessage('${data._id}')"><i class="material-icons">delete</i></a>
                    <a href="/messages/${data._id}"><i class="material-icons">input</i></a>
                </div>
            </li>
            `)
        })
        }
    });

function deleteMessage(id){
    $.ajax({
        url: 'http://localhost:3000/api/groups/delete/'+id,
        type: 'DELETE',
        success: function(result) {
        $(`.group-${id}`).remove();
        }
    });
}
    

