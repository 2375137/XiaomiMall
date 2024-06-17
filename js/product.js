const currentDomain = window.location.hostname;
const currentPort = window.location.port;
const click_url = currentDomain + ':' + currentPort
document.getElementById('index').href = 'index.html'

const params = new URLSearchParams(window.location.search);
let product_id = 0
for (const [key, value] of params) {
    console.log(key, value);
    if (key === 'product'){
        product_id = value
    }
}
const url = "http://127.0.0.1:5000/get_info"
function get_info(product_id){
    if (parseInt(product_id) === 0) {
        alert("缺乏关键参数")
        window.open("https://156365.xyz",'_self');
        return
    }
    const data = {
        product: parseInt(product_id)
    }
    fetch(url, { // 发送POST请求
        method: 'POST', // 使用POST方法
        headers: { // 设置请求头
            'Content-Type': 'application/json', // 设置请求体为JSON格式
        },
        body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
    }).then(response => response.json()).then(data => {
        if(data['code'] !== 0){
            alert('商品不存在或者已过期!')
            window.location.href = "https://mi.com"
            return;
        }
        document.title = data['data']['product']['name'];
        document.getElementById('shop_title').innerHTML = data['data']['product']['name'];
        document.getElementById('shop_title_3').innerHTML = data['data']['product']['name'];
        document.getElementById('shop_name_1').innerHTML = data['data']['goodsInfo']['goodsList'][0]['name']
        document.getElementById('shop_name_2').innerHTML = data['data']['goodsInfo']['goodsList'][0]['name']
        document.getElementById('shop_name_6').innerHTML = data['data']['goodsInfo']['goodsList'][0]['name']
        document.getElementById('buy_num').innerHTML = data['data']['buyerShow']['total']
        document.getElementById('shop_name_9').src = data['data']['goodsInfo']['goodsList'][0]['imgUrl']
        let desc;
        if(data['data']['product']['extendDesc'] !== undefined){
            desc = '<span style="color:#ff4a00">' + data['data']['product']['extendDesc'] +"</span>" + data['data']['product']['shortTitle']

        }
        document.getElementById('shop_desc').innerHTML = desc;
        document.getElementById('shop_price').innerHTML = data['data']['goodsInfo']['goodsList'][0]['price'] + "元";
        document.getElementById('shop_price_3').innerHTML = data['data']['goodsInfo']['goodsList'][0]['price']+"元";
        document.getElementById('shop_price_4').innerHTML = data['data']['goodsInfo']['goodsList'][0]['price'];

        let img_list = data['data']['goodsInfo']['goodsList'][0]['carouselList']
        let a = document.getElementById('show_1')
        let b = document.getElementById('show_2')
        // console.log(data["data"]["realProduct"]["realProductInfo"][Object.keys(data["data"]["realProduct"]["realProductInfo"])[0]]["materialTabList"][0]["materialViewList"][0]["materialList"][0]["imageUrl"])
        a.innerHTML = ''
        b.innerHTML = ''
        for(let c=0;c<img_list.length;c++){
            let html1;
            let html2;
            if (c === 0){
                html1 = '<button aria-current="true" aria-label="Slide "'+c+' class="active" data-bs-slide-to="'+c+'" data-bs-target="#show_" type="button"></button>'
                html2 = '<div class="carousel-item active"><img alt="..." class="d-block w-100" src="'+img_list[c]['imgUrl']+'"></div>'
            }
            else{
                html1 = '<button aria-current="true" aria-label="Slide "'+c+' data-bs-slide-to="'+c+'" data-bs-target="#show_" type="button"></button>'
                html2 = '<div class="carousel-item"><img alt="..." class="d-block w-100" src="'+img_list[c]['imgUrl']+'"></div>'
            }
            a.innerHTML += html1
            b.innerHTML += html2
        }
        let show_list_pic = data["data"]["realProduct"]["realProductInfo"][Object.keys(data["data"]["realProduct"]["realProductInfo"])[0]]["materialTabList"][0]["materialViewList"]
        document.getElementById('shop_show_1').innerHTML = ''
        for(let z = 0;z<show_list_pic.length;z++){
            document.getElementById('shop_show_1').innerHTML += '<img alt="..." class="d-block w-100" style="width: 70%" src="'+show_list_pic[z]["materialList"][0]["imageUrl"]+'"></div>'
        }
        let show_list_pic_1 = data["data"]["realProduct"]["realProductInfo"][Object.keys(data["data"]["realProduct"]["realProductInfo"])[0]]["materialTabList"][1]["materialViewList"]
        document.getElementById('shop_show_2').innerHTML = ''
        for(let z = 0;z<show_list_pic_1.length;z++){
            document.getElementById('shop_show_2').innerHTML += '<img alt="..." class="d-block w-100" style="width: 70%" src="'+show_list_pic_1[z]["materialList"][0]["imageUrl"]+'"></div>'
        }

        console.log(data)

    }).catch(error => console.error('Error:', error)); // 捕获并打印错误
}

get_info(product_id)

function check_sign(){
    document.getElementById('login_in_body').innerHTML = ''
    document.getElementById('login_in_footer').innerHTML = ''
    document.getElementById('exampleModalLabel').innerHTML = '注册对话框'
    document.getElementById('login_in_body').innerHTML = "<div style='margin: 0 auto'>注册不想写了,跟登录类似</div>"
    document.getElementById('login_in_footer').innerHTML = '<button class="btn btn-primary" data-bs-dismiss="modal" type="button">确定</button>'
}

function check_login(){
    document.getElementById('exampleModalLabel').innerHTML = '登录对话框'
    document.getElementById('login_in_body').innerHTML = ''
    document.getElementById('login_in_footer').innerHTML = ''
    axios.post("http://127.0.0.1:5000/get_shopping_list", {}, {
        method: "POST",
        withCredentials: true,
    }).then(data =>{
        if (data["data"]["code"] === 400){
            console.log("用户尚登录")
            document.getElementById('login_in_body').innerHTML = '<div><span>账号:</span><label><input type="text" class="form-control" id="username" placeholder="请输入用户账号"></label></div><div><span>密码:</span><label><input type="text" class="form-control" id="password" placeholder="请输入用户密码"></label></div>'
            document.getElementById('login_in_footer').innerHTML += '<button class="btn btn-primary" data-bs-dismiss="modal" type="button">取消</button><button class="btn btn-primary" type="button" id="login" onclick="login()">登录</button>'
        }else{
            document.getElementById('login_in_body').innerHTML = "<div style='margin: 0 auto'>你已经登录了,不需要重复登录</div>"
            document.getElementById('login_in_footer').innerHTML = '<button class="btn btn-primary" data-bs-dismiss="modal" type="button">确定</button>'
        }
    }).catch(error => console.error('Error:',error))
}

function login(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    if(username === '' || password === ''){
        appendAlert("请先输入用户名或者密码",'success')
        return;
    }
    // const formData = {
    //     account: username,
    //     password: password,
    //     email: '0',
    //     age: 0,
    //     gender: '0',
    //     course: [0],
    //     college: '0',
    //     date: '0',
    //     content: {
    //         url: '0',
    //     },
    // };
    // console.log(formData)
    const login_formData = {
        account: username,
        password: password,
    }
    const url = 'http://127.0.0.1:5000/get_login_in'; // 目标API的URL
    axios.post(url, login_formData, {
        headers: {},
        withCredentials: true,
    }).then((res) => {
        console.log(res);
        if (res['data']['code'] === 200){
            document.cookie = "token=" + res["token"] + "; path=/";
            console.log(document.cookie)
            location.reload();
        }
        else{
            console.log("登录失败,请检查账号或密码");
            appendAlert("请检查账号或密码是否正确",'warning')
        }

    });
}

function randomString(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function remove_(){
    console.log("执行")
    // 假设父节点有一个id，我们可以通过id选择器获取到这个父节点
    const parentElement = document.getElementById('liveAlertPlaceholder');

    // 检查父节点是否有子节点
    if (parentElement.children.length > 0) {
        // 获取父节点的第一个子节点
        const firstChild = parentElement.firstChild;

        // 删除父节点中的第一个子节点
        firstChild.remove()
    }


}

let id;

const appendAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert" id="${id}">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
    setTimeout("remove_()", 3000)
}

function mouseevent(name,i){
    const url = 'http://127.0.0.1:5000/get_show'; // 目标API的URL
    const data = { // 要传递的JSON数据
        id: i,
        type: 0
    };
    fetch(url, { // 发送POST请求
        method: 'POST', // 使用POST方法
        headers: { // 设置请求头
            'Content-Type': 'application/json', // 设置请求体为JSON格式
        },
        body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
    }).then(response => response.json()).then(data => {
        if (data.length > 6) {
            data = data.slice(0, 6);  // 如果长度大于12，删除超过部分
        }
        console.log(data)

        for(let k=0;k<data.length;k++){
            let li  = '<li onclick="click_('+data[k]["product_id"]+')" style="text-align: center"><div style="width: 100%"><img style="width: 60%" src="'+data[k]["puzzle_url"]+'" alt=""></div><p style="overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">'+data[k]["name"]+'</p><p>'+data[k]["price"]+'</p></li>'
            document.getElementById(name.toString()).innerHTML += li
        }
    }).catch(error => console.error('Error:', error)); // 捕获并打印错误
}

function click_(_id){
    window.location.href = 'http://'+click_url+'/bootstrap/product.html?product='+_id
}

mouseevent('xiaomi',1242)
mouseevent('redmi',1243)
mouseevent('pc',459)

let myElement = document.getElementById('navbar_');
let myElement1 = document.getElementById('navbar_1');
window.addEventListener('scroll', function() {
    if (myElement1.getBoundingClientRect().top > 0){
        myElement.classList.remove('fixed-top')
        document.getElementById('myTabContent').style.paddingTop = '0';
    }
    if (myElement.getBoundingClientRect().top < 50){
        document.getElementById('nav_').style.display = 'none'
        if (myElement.getBoundingClientRect().top <= 0){
            myElement.classList.add('fixed-top')
            document.getElementById('myTabContent').style.paddingTop = '20px';
        }
    }
    else{
        document.getElementById('nav_').style.display = 'block'
    }
});


let page_index_ = 0
let page_size_ = 10
let session_id_ = randomString(10)
function get_buy_speak(){
    const data = { // 要传递的JSON数据
        product_id: product_id,
        page_index: page_index_,
        page_size: page_size_,
        session_id:session_id_

    };
    fetch('http://127.0.0.1:5000/buyer_show_list', { // 发送POST请求
        method: 'POST', // 使用POST方法
        headers: { // 设置请求头
            'Content-Type': 'application/json', // 设置请求体为JSON格式
        },
        body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
    }).then(response => response.json()).then(data => {
        // console.log(data)
        if(data['code'] !== 0){
            alert("商品不存在!")
            window.open("https://mi.com")
            return;
        }
        console.log(page_index_)
        if (data['data']['detail'] !== undefined){
            document.getElementById('satisfy_per').innerHTML = data['data']['detail']['satisfy_per']
            document.getElementById('speak_num').innerHTML = data['data']['detail']['comments_total']
            document.getElementById('speak_star').innerHTML = ''
            for(let i =0;i<Math.round(Math.round((data['data']['detail']['satisfy_per'] / 20)));i++){
                document.getElementById('speak_star').innerHTML += '★'
            }
            for(let i =0;i<5 - Math.round(Math.round((data['data']['detail']['satisfy_per'] / 20)));i++){
                document.getElementById('speak_star_').innerHTML += '★'
            }
            document.getElementById('speak_num_').innerHTML = parseFloat((data['data']['detail']['satisfy_per'] / 10).toString()).toString()
            let sum = 0
            sum += data['data']['detail']['five_star']
            sum += data['data']['detail']['four_star']
            sum += data['data']['detail']['three_star']
            sum += data['data']['detail']['two_star']
            sum += data['data']['detail']['one_star']
            document.getElementById('one').style.width = ((data['data']['detail']['one_star'] / sum).toFixed(2)*100).toString() + '%'
            document.getElementById('two').style.width = ((data['data']['detail']['two_star'] / sum).toFixed(2)*100).toString() + '%'
            document.getElementById('three').style.width = ((data['data']['detail']['three_star'] / sum).toFixed(2)*100).toString() + '%'
            document.getElementById('four').style.width = ((data['data']['detail']['four_star'] / sum).toFixed(2)*100).toString() + '%'
            document.getElementById('five').style.width = ((data['data']['detail']['five_star'] / sum).toFixed(2)*100).toString() + '%'
            console.log(((data['data']['detail']['two_star'] / sum).toFixed(2)*100).toString() + '%')
        }

        // console.log((data['data']['comments']).length)
        document.getElementById('content_shop_content').innerHTML = ''
        for (let i = 0;i<(data['data']['comments']).length;i++){
            let content_list = '';
            // console.log(data['data']['comments'][i]['comment_images'])
            if(data['data']['comments'][i]['comment_images'] !== undefined){
                for(let k=0;k<(data['data']['comments'][i]['comment_images']).length;k++){
                    content_list += '<img src="'+data['data']['comments'][i]['comment_images'][k]+'" alt="" style="margin: 0 5px;width: 25%;overflow: hidden;height: 100%;border-radius: 8px;">'
                }
                let up_num = ''
                if(data['data']['comments'][i]['up_num'] !== undefined){
                    up_num = data['data']['comments'][i]['up_num']
                }
                document.getElementById('content_shop_content').innerHTML += '<div style="border-radius: 8px;overflow: hidden;margin-top:10px;padding: 15px;background-color: #fff"><div style="display: flex;width: 100%;justify-content: space-between"><div style="max-width: 40%;overflow: hidden;display: flex;align-items: center"><div style="width: 15%;font-size: 0;border-radius: 50%;overflow: hidden"><img src="'+data['data']['comments'][i]['user_avatar']+'" style="width: 100%" alt=""></div><div style="width: 70%">'+data['data']['comments'][i]['user_name']+'</div></div></div><div style="width: 100%"><div><p style="margin: 5px 0;padding: 2px 5px">'+data['data']['comments'][i]["comment_content"]+'</p></div><div style="width: 100%;display: flex;flex-wrap: wrap"><div style="width: 100%;display: flex;overflow: hidden;border-radius: 8px;align-items: flex-start;height:150px">'+content_list+'</div></div></div><div><div class="card-ctrl" data-v-2fe95dc4=""><a class="shar-btn"></a><a class="send-btn"></a><a class="praise-btn"><span class="num" data-v-2fe95dc4="">'+up_num+'</span></a></div></div></div>'

            }else{
                let up_num = ''
                if(data['data']['comments'][i]['up_num'] !== undefined){
                    up_num = data['data']['comments'][i]['up_num']
                }
                document.getElementById('content_shop_content').innerHTML += '<div style="border-radius: 8px;overflow: hidden;margin-top:10px;padding: 15px;background-color: #fff"><div style="display: flex;width: 100%;justify-content: space-between"><div style="max-width: 40%;overflow: hidden;display: flex;align-items: center"><div style="width: 15%;font-size: 0;border-radius: 50%;overflow: hidden"><img src="'+data['data']['comments'][i]['user_avatar']+'" style="width: 100%" alt=""></div><div style="width: 70%">'+data['data']['comments'][i]['user_name']+'</div></div></div><div style="width: 100%"><div><p style="margin: 5px 0;padding: 2px 5px">'+data['data']['comments'][i]["comment_content"]+'</p></div><div style="width: 100%;display: flex;flex-wrap: wrap"><div style="width: 100%;display: flex;overflow: hidden;border-radius: 8px;align-items: flex-start;height:0">'+content_list+'</div></div></div><div><div class="card-ctrl" data-v-2fe95dc4=""><a class="shar-btn"></a><a class="send-btn"></a><a class="praise-btn"><span class="num" data-v-2fe95dc4="">'+up_num+'</span></a></div></div></div>'
            }
        }


    }).catch(error => console.error('Error:', error)); // 捕获并打印错误
}


get_buy_speak()
page_index_ = 2

function click_last(){
    if(page_index_ !== 0 && page_index_ > 0){
        page_index_ -= 1
        if (page_index_ === 0){
            document.getElementById('click_last_').classList.add('disabled')
        }
    }else{
        document.getElementById('click_last_').classList.add('disabled')
    }
    // console.log(page_index_)
    get_buy_speak()
    document.getElementById('example').scrollTop = 0
}

function click_next(){
    if(page_index_ !== 0 && page_index_ >= 0){
        document.getElementById('click_last_').classList.remove('disabled')
    }
    page_index_ += 1
    get_buy_speak()
    console.log(document.getElementById('content_shop_content').offsetTop)
    document.getElementById('example').scrollTop = 0
}




