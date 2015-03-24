var imgurl



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
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    xmlHttp = newActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
    }
    xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    imgurl = xmlHttp.responseText;
                    document.body.style.backgroundImage = "url('" + imgurl + "')";
                    document.getElementById("rate_div_id").innerHTML = "\n    <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n        <a id=\"likeButton\" class=\"btn btn-link rippler rippler-bs-primary\"><span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span></button>\n        <a id=\"dislikeButton\" class=\"btn btn-link rippler rippler-bs-primary\"><span class=\"glyphicon glyphicon-thumbs-down\" aria-hidden=\"true\"></span></button>\n    </div>"
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
                                $btn.button('reset')
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
                                $btn.button('reset')
                            }
                        });
                    })

                } else {
                    // alert("xmlHttp.status ==" + xmlHttp.status);
                }
            }
        }
        //alert(genQuery(color));
    xmlHttp.open('GET', genQuery(color), true);
    //xmlHttp.setRequestHeader("Content-Type", "");
    xmlHttp.send(null);
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
