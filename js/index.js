let static_ = 0
const currentDomain = window.location.hostname;
const currentPort = window.location.port;
const click_url = currentDomain + ':' + currentPort
window.addEventListener('resize', function() {
    console.log("新的窗口宽度是： " + window.screen.width);
    let min;
    let viewportWidth = window.screen.width;
    let viewportWidth_ = window.innerWidth;
    console.log("新"+window.innerWidth)
    if(viewportWidth_ > viewportWidth){
        min = viewportWidth
    }
    else{
        min = viewportWidth_ // 判断是否为md视图
    }
    console.log(min)

    if(static_ === 0 && min>=768){
        console.log("触发PC视图")
        resize()
        static_ = 1
    }else if(static_ === 1 && min < 768){
        console.log("触发移动视图")
        resize()
        static_ = 0
    }

    console.log(static_)

});


function resize(){
    // console.log("触发")
    // 使用JavaScript来判断视图并请求相应的接口
    let min;
    let viewportWidth = window.screen.width;
    let viewportWidth_ = window.innerWidth;
    // console.log("新"+window.innerWidth)
    if(viewportWidth_ > viewportWidth){
        min = viewportWidth
    }
    else{
        min = viewportWidth_ // 判断是否为md视图
    }

    console.log(min)

    const url = 'http://127.0.0.1:5000/get_pic'; // 目标API的URL
    if (min >= 768) {
        const data = { // 要传递的JSON数据
            mode: "PC"
        };
        fetch(url, { // 发送POST请求
            method: 'POST', // 使用POST方法
            headers: { // 设置请求头
                'Content-Type': 'application/json', // 设置请求体为JSON格式
            },
            body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
        }).then(response => response.json()).then(data => {
            let imageContainer = document.getElementById('image-container');

            let children = imageContainer.children;
            // 遍历所有的子元素，逐个删除
            for (let i = children.length - 1; i >= 0; i--) {
                imageContainer.removeChild(children[i]);
            }
            for(let q=0;q<data.length;q++){
                let imageSrc = data[q][0];
                let newDiv = document.createElement('div');
                // 设置新div的属性
                newDiv.innerHTML = '<a href="http://'+click_url+'/bootstrap/product.html?product='+data[q][1]+'"><img src="' + imageSrc + '"  alt=""/></a>';
                imageContainer.append(newDiv);
            }
        }).catch(error => console.error('Error:', error)); // 捕获并打印错误
    } else{
        // 在sm视图下请求b接口获取数据
        const data = { // 要传递的JSON数据
            mode: "mobile"
        };
        fetch(url, { // 发送POST请求
            method: 'POST', // 使用POST方法
            headers: { // 设置请求头
                'Content-Type': 'application/json', // 设置请求体为JSON格式
            },
            body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
        }).then(response => response.json()).then(data => {
            let imageContainer = document.getElementById('image-container');
            let children = imageContainer.children;
            console.log(children)
            // 遍历所有的子元素，逐个删除
            for (let i = children.length - 1; i >= 0; i--) {
                imageContainer.removeChild(children[i]);
            }
            console.log('')
            for(let q=0;q<data.length;q++){
                let imageSrc = data[q][0];
                let newDiv = document.createElement('div');
                // 设置新div的属性
                newDiv.innerHTML = '<a href="http://'+click_url+'/bootstrap/product.html?product='+data[q][1]+'"><img src="' + imageSrc + '"  alt="" style="width: 100%;"/></a>';
                imageContainer.append(newDiv);
            }
        }).catch(error => console.error('Error:', error)); // 捕获并打印错误
    }
}

resize()


function search(){
    if (document.getElementById('search_content').value === '' || document.getElementById('search_content').value === undefined){
        document.getElementById('modal_content_search').innerHTML = '你没有输入任何东西'
        return
    }
    let data = {
        data:document.getElementById('search_content').value
    }
    fetch('http://127.0.0.1:5000/response', { // 发送POST请求
        method: 'POST', // 使用POST方法
        headers: { // 设置请求头
            'Content-Type': 'application/json', // 设置请求体为JSON格式
        },
        body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
    }).then(response => response.json()).then(data => {
        document.getElementById('modal_content_search').innerHTML = data
    }).catch(error => console.error('Error:', error)); // 捕获并打印错误

}

let formData = {
    type:1
}

fetch("http://127.0.0.1:5000/get_show", { // 发送POST请求
    method: 'POST', // 使用POST方法
    headers: { // 设置请求头
        'Content-Type': 'application/json', // 设置请求体为JSON格式
    },
    body: JSON.stringify(formData), // 将JSON数据转换为字符串并作为请求体发送,
}).then(response => response.json()).then(data => {
    console.log(data)
    for(let i = 0;i<data.length;i++){
        let new_img = document.createElement('div')
        new_img.classList.add('carousel-item')
        if(i === 0){
            new_img.classList.add('active')
        }
        new_img.innerHTML = '<a href="product.html?product='+data[i][1]+'"><img alt="..." class="d-block w-100" src="'+data[i][0]+'"></a>'
        document.getElementById('show').append(new_img)
        if (i === 0){
            document.getElementById('show_button').innerHTML += '<button class="active" aria-label="Slide '+(i+1)+'" data-bs-slide-to="'+i+'" data-bs-target="#carouselExampleIndicators" type="button"></button>'

        }else{
            document.getElementById('show_button').innerHTML += '<button aria-label="Slide '+(i+1)+'" data-bs-slide-to="'+i+'" data-bs-target="#carouselExampleIndicators" type="button"></button>'
        }
    }
}).catch(error => console.error('Error:', error)); // 捕获并打印错误


function get_data(i,name){
    const url = 'http://127.0.0.1:5000/get_show'; // 目标API的URL
    const data = { // 要传递的JSON数据
        type: 0,
        id: i
    };
    fetch(url, { // 发送POST请求
        method: 'POST', // 使用POST方法
        headers: { // 设置请求头
            'Content-Type': 'application/json', // 设置请求体为JSON格式
        },
        body: JSON.stringify(data), // 将JSON数据转换为字符串并作为请求体发送,
    }).then(response => response.json()).then(data => {
        if (data.length > 8) {
            data = data.slice(0, 8);  // 如果长度大于12，删除超过部分
        }
        console.log(data)
        for(let x = 0;x<data.length;x++){
            document.getElementById(name).innerHTML += '<div onclick="click_('+data[x]["product_id"]+')" class="card card_" style="width: 23%;box-sizing: border-box;margin: 10px;border: 0"><img src="'+data[x]["puzzle_url"]+'" class="card-img-top" alt="..."><div class="card-body"><h6>'+data[x]["name"]+'</h6><p class="card-text">'+data[x]["product_desc"]+'</p><p>￥'+data[x]['price']+'</p></div></div>'
        }

    }).catch(error => console.error('Error:', error)); // 捕获并打印错误
}

function click_(_id){
    window.location.href = 'product.html?product='+_id
}

get_data(1242,"xiaomi")
get_data(1243,"redmi")
get_data(458,"tv")