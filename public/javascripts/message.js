$('#btn-send').click(() => {
  const text = $('#text').val();
  $.post('http://localhost:3000/api/messages',{text:text,user:1,grup:1},(data,status) => {
    if (status == 'success') {
      $('#text').val('');
      $('#text').focus();
      $('#list-message').prepend(`
        <li class="collection-item avatar message-${data.data._id}">
         <img src="http://webiconspng.com/wp-content/uploads/2016/11/avatar_male_man_mature_old_person_user_icon_628284.png" alt="" class="circle">
         <span class="title">${data.data.user}</span>
         <p class="text-message-${data.data._id}">${data.data.text}</p>
         <input type="text" class="update-text-${data.data._id}" value="${data.data.text}" style="display:none">
         <div class="secondary-content">
           <button class="btn-floating btn-large waves-effect waves-light red btn-delete btn-delete-${data.data._id}" onclick="deleteMessage('${data.data._id}')" data-id="${data.data._id}" ><i class="material-icons">delete</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-update btn-update-${data.data._id}" data-id="${data.data._id}" onclick="updateMessage('${data.data._id}')" ><i class="material-icons">edit</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-delete btn-cancel-${data.data._id}" onclick="cancelUpdateMessage('${data.data._id}')" data-id="${data.data._id}" style="display:none" ><i class="material-icons">cancel</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-update btn-update-send-${data.data._id}" data-id="${data.data._id}" onclick="sendUpdateMessage('${data.data._id}')"style="display:none" ><i class="material-icons">send</i></button>
         </div>
       </li >
      `);
    }
  });
});

$('#btn-search').click(() => {
  const text = $('#text-search').val();
  $.get('http://localhost:3000/api/messages/search?q='+ text,(data,status) => {
    if (status == 'success') {
      $('#text').focus();
      $('#list-search').empty();
      data.forEach((data) => {
        $('#list-search').prepend(`
         <li class="collection-item">
           <span class="title"><b>${data.name}</b></span>
           <p><a href="${data.url}">${data.url}</a></p>
           <p>${data.snippet}</p>
           <button type="button" name="button" class="waves-effect waves-light btn red btn-send-on-search" onclick="sendMessageSearch('${data.name}','${data.url}','${data.snippet}')">Send</button>
           <div class="secondary-content">
           </div>
         </li>
        `);
      })
    }
  });
  let url = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${text}&site=stackoverflow`;
  axios.get(url).then((data) => {
    // console.log(data.data);
    $('#list-stack').empty();
    data.data.items.forEach((data) => {
      if (data.is_answered) {
        $('#list-stack').prepend(`
         <li class="collection-item">
           <span class="title"><b>${data.title}</b></span>
           <p><a href="${data.url}">${data.link}</a></p>
           <p>${data.tags.join(', ')}</p>
           <button type="button" name="button" class="waves-effect waves-light btn red btn-send-on-stack" onclick="sendMessageSearch('${data.title}','${data.link}','${data.tags.join(', ')}')">Send</button>
           <div class="secondary-content">
           </div>
         </li>
        `);
      }
    })
  }).catch((err) => {
    console.log(err);
  });
});

$(document).ready(() => {
  var url = document.URL;
  url = url.split('/');
  var id = url[url.length - 1];
  $.get(`http://localhost:3000/api/messages/${id}`,(data,status) => {
    if (status == 'success') {
      data.data.forEach((data) => {
        $('#list-message').prepend(`
         <li class="collection-item avatar message-${data._id}">
           <img src="http://webiconspng.com/wp-content/uploads/2016/11/avatar_male_man_mature_old_person_user_icon_628284.png" alt="" class="circle">
           <span class="title">${data.user}</span>
           <p class="text-message-${data._id}">${data.text}</p>
           <input type="text" class="update-text-${data._id}" value="${data.text}" style="display:none">
           <div class="secondary-content">
           <button class="btn-floating btn-large waves-effect waves-light red btn-delete btn-delete-${data._id}" onclick="deleteMessage('${data._id}')" data-id="${data._id}" ><i class="material-icons">delete</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-update btn-update-${data._id}" data-id="${data._id}" onclick="updateMessage('${data._id}')" ><i class="material-icons">edit</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-delete btn-cancel-${data._id}" onclick="cancelUpdateMessage('${data._id}')" data-id="${data._id}" style="display:none" ><i class="material-icons">cancel</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-update btn-update-send-${data._id}" data-id="${data._id}" onclick="sendUpdateMessage('${data._id}')"style="display:none" ><i class="material-icons">send</i></button>
           </div>
         </li>
        `);
      })
    }
  });
});
function deleteMessage(id){
  $.ajax({
    url: 'http://localhost:3000/api/messages/'+id,
    type: 'DELETE',
    success: function(result) {
      $(`.message-${id}`).remove();
    }
  });
}

function updateMessage(id){

  $(`.text-message-${id}`).hide();
  $(`.update-text-${id}`).show();
  $(`.update-text-${id}`).focus();
  $(`.btn-delete-${id}`).hide();
  $(`.btn-update-${id}`).hide();
  $(`.btn-cancel-${id}`).show();
  $(`.btn-update-send-${id}`).show();
}

function cancelUpdateMessage(id){

  $(`.text-message-${id}`).show();
  let val = $(`.text-message-${id}`).text();
  $(`.update-text-${id}`).hide();
  $(`.update-text-${id}`).val(val);
  $(`.btn-delete-${id}`).show();
  $(`.btn-update-${id}`).show();
  $(`.btn-cancel-${id}`).hide();
  $(`.btn-update-send-${id}`).hide();
}

function sendUpdateMessage(id){
  console.log('updateeee');
  let newText =$(`.update-text-${id}`).val();
  $.ajax({
    url: 'http://localhost:3000/api/messages/'+id,
    type: 'PUT',
    data: {
      text: newText ,
    },
    success: function(result) {
      $(`.text-message-${id}`).text(newText);
      cancelUpdateMessage(id);
    }
  });
}

function sendMessageSearch(title,url,text){
  let message = `${title} \n ${url} \n ${text}`;
  console.log(text);
  $.post('http://localhost:3000/api/messages',{text:message,user:1,grup:1,link:true},(data,status) => {
    if (status == 'success') {
      $('#text').val('');
      $('#text').focus();
      $('#list-message').prepend(`
        <li class="collection-item avatar message-${data.data._id}">
         <img src="http://webiconspng.com/wp-content/uploads/2016/11/avatar_male_man_mature_old_person_user_icon_628284.png" alt="" class="circle">
         <span class="title">${data.data.user}</span>
         <p class="text-message-${data.data._id}">${data.data.text}</p>
         <input type="text" class="update-text-${data.data._id}" value="${data.data.text}" style="display:none">
         <div class="secondary-content">
           <button class="btn-floating btn-large waves-effect waves-light red btn-delete btn-delete-${data.data._id}" onclick="deleteMessage('${data.data._id}')" data-id="${data.data._id}" ><i class="material-icons">delete</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-update btn-update-${data.data._id}" data-id="${data.data._id}" onclick="updateMessage('${data.data._id}')" ><i class="material-icons">edit</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-delete btn-cancel-${data.data._id}" onclick="cancelUpdateMessage('${data.data._id}')" data-id="${data.data._id}" style="display:none" ><i class="material-icons">cancel</i></button>
           <button class="btn-floating btn-large waves-effect waves-light red btn-update btn-update-send-${data.data._id}" data-id="${data.data._id}" onclick="sendUpdateMessage('${data.data._id}')"style="display:none" ><i class="material-icons">send</i></button>
         </div>
       </li >
      `);
      $('#list-stack').empty();
      $('#list-search').empty();
    }
  });
}
