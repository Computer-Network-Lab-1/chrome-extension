var imgurl

$(document).ready(function() {
    $(".rippler").rippler({
        effectClass: 'rippler-effect',
        effectSize: 16 // Default size (width & height)
            ,
        addElement: 'div' // e.g. 'svg'(feature)
            ,
        duration: 400
    });
});

$('#likeButton').on('click', function() {
    // var $btn = $(this).button('loading')
    console.log("Like button clicked.")
    $.ajax({
        type: 'GET',
        url: 'http://photo.yangjunrui.com/like',
        data: {
            url: imgurl
        },
        dataType: 'json',
        complete: function(XMLHttpRequest, textStatus) {
            // $btn.button('reset')
        }
    });
})

$('#dislikeButton').on('click', function() {
    // var $btn = $(this).button('loading')
    console.log("Like button clicked.")
    $.ajax({
        type: 'GET',
        url: 'http://photo.yangjunrui.com/dislike',
        data: {
            url: imgurl
        },
        dataType: 'json',
        complete: function(XMLHttpRequest, textStatus) {
            // $btn.button('reset')
        }
    });
})

function getRandomNumber(l, r) {
    return l + Math.floor((Math.random() * (r - l)));
}

fake_candidates = [
    "http://img3.douban.com/view/photo/raw/public/p1697145320.jpg",
    "http://img5.douban.com/view/photo/raw/public/p1036816337.jpg",
    "http://img3.douban.com/view/photo/raw/public/p2211486755.jpg",
    "http://img3.douban.com/view/photo/raw/public/p2186886924.jpg"
];

function fakeGetNextImg(color) {
    var index = getRandomNumber(0, 4);
    // alert(index);
    return {
        url: fake_candidates[index],
    }
}

function getNextImg(color) {
    $.ajax({
        type: 'GET',
        url: 'http://photo.yangjunrui.com/color',
        data: {
            r: color.r,
            g: color.g,
            b: color.b,
        },
        dataType: 'text',
        success: function(XMLHttpRequest, textStatus) {
            imgurl = XMLHttpRequest
            $('#likeButton').removeClass("hidden");
            $('#dislikeButton').removeClass("hidden");
            $.backstretch(imgurl);
        }
    });
}

function genQuery(color) {
    server_ip = "http://photo.yangjunrui.com";
    var url = server_ip + "/color?r=" + color.r + "&g=" + color.g + "&b=" + color.b;
    return url
}

function init() {
    chrome.storage.sync.get("color", function(items) {
        color = JSON.parse(items.color);
        console.log(color)
        getNextImg(color);
    });
}

function fakeInit() {
    var img = fakeGetNextImg("");
    document.body.style.backgroundImage = "url('" + img.url + "')";
}

//window.addEventListener("load", fakeInit);
window.addEventListener("load", init);
