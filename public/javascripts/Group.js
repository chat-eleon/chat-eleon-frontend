$('#create-group').click(()=>{
    let input = {
        title : $('#group'),
        langguage: $('#langguage')
    }
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/post",
        data: input,
        dataType:'json',
        success: function(respon){
            window.location.href = '/groups' 
        }
    })
})

