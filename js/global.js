var jQT = new $.jQTouch({
    statusBar: 'default',
    useAnimations: false,
    useFastTouch: false,
});


var init = function(){
    var startTime, endTime;
    var d= new Date();
    var gbMove = false;
    allowClick = true;
    function preventGhostClick(){
        allowClick = false;
        setTimeout(function(){
                allowClick = true;
        },900);
    }

    function removeActive($el){
        $el.css('background-color' , 'transparent');
        //$('.active').removeClass('active');
    }
    

    function setActive($el){
        $el.css('background-color', '#53B401');
        //$el.addClass('active');
        setTimeout(function(){
            removeActive($el);
        //    $el.removeClass('active');
        }, 900);
    }

    function bindClick($el, func){
        $el.bind('touchstart',function(event) {
            setActive($(this));
            startTime = new Date().getTime(); 
            gbMove = false;        
        });

        $el.bind('touchmove',function(event) {
            removeActive($(this));
            gbMove = true;
        });

        $el.bind('touchend',function(event) {
            endTime = new Date().getTime();
            var difTime = (endTime-startTime);
            if(!gbMove && difTime > 100){
                var $ok  = $(this);
                if(!allowClick){
                     return false;}
                else{
                    preventGhostClick();
                    func($(this));
               }
            }
        });
    }
    
    /*$('a.no_udid').unbind('click').bind('click', function(e){
        if(!allowClick) return false;
        preventGhostClick();
        if(confirm('You need to register your Device first before you can install apps and earn credits')){
            window.location.href = 'http://srajdev.com/media/images/signed.mobileconfig';
        }

    })*/
    
    function no_udid($elem){
        //if(!allowClick) return false;
        //preventGhostClick();
        if(confirm('You need to register your Device first before you can install apps and earn credits')){
            window.location.href = 'http://srajdev.com/media/images/signed.mobileconfig';
        }
    }
    bindClick($('a.no_udid'), no_udid);

    //$('a.has_udid').live('click', function (e){
    function has_udid($elem){
        var $action_url = $elem.attr('action_url');
        window.location.href = $action_url;

        e.preventDefault();
    }
    bindClick($('a.has_udid'), has_udid);

    $('a.no_email').bind('tap' ,  function(e){
        if(!allowClick) return false;
        preventGhostClick();
        $me = $(this);
        haveEnough = checkCredits($me);
        if(haveEnough){
            var user_id = $(this).attr('user_id');
            var retVal = prompt("Please provide us with your email address where we can send this reward. If this is your first time, we will send a verification email first.");
            if(retVal){
                emailAjax(retVal, user_id);   
            }
        }
        else{
            alert('You do not have enough credits to redeem this reward. Please go back to the Home page to earn more credits.');
        }
    })

    $('a.not_verified').bind('tap', function(e){
        if(!allowClick) return false;
        preventGhostClick();
        $me = $(this);
        haveEnough = checkCredits($me);
        if(haveEnough){
            if(confirm("You are not verified, want us to resend the activaiton email")){
                var email = $(this).attr('email');
                var userId = $(this).attr('user_id');
                emailAjax(email,userId);
            }
        }
    })

    $('a.has_email').bind('tap', function(e){
        if(!allowClick) return false;
        preventGhostClick();
        $me = $(this);
        haveEnough = checkCredits($me);
        if(haveEnough){
            var email = $(this).attr('email');
            if(confirm('Your reward will be sent to ' + email + ' within 48 hours. Please click OK to confirm.')){
                var userId = $(this).attr('user_id');
                var rewardNo = $(this).attr('rewards_no');
                rewardsAjax(email, userId, rewardNo);
            }
        }
        else{
            alert('You do not have enough credits to redeem this reward. Please go back to the Home page to earn more credits.');
        }
    })

    $('a.refresh_button').bind('click', function(e){
        window.location.reload();
    })

    $('a.behind').bind('tap', function(e){
        $(".enabled").removeClass("enabled");

    })

    $('a.facebook_refer').bind('click', function(e){
        window.location.href = 'http://www.facebook.com/dialog/feed?app_id=122537121128186&link=http%3A%2F%2Fsrajdev.com%2Fm&picture=http%3A%2F%2Fsrajdev.com%2Fmedia%2Fimages%2FIcon.png&name=CreditsMob&caption=Instant+mobile+shopping+credits&description=Earn+rewards+for+trying+out+free+apps+on+your+iPhone/iPad/iPod+touch!&redirect_uri=http://srajdev.com/m';
        
        //window.location.href = 'http://www.facebook.com/dialog/feed?app_id=523467297681888&link=http%3A%2F%2Fcreditsmob.com&picture=http%3A%2F%2Fsrajdev.com%2Fmedia%2Fimages%2FIcon.png&name=CreditsMob&caption=Instant+mobile+shopping+credits&description=Earn+rewards+for+trying+out+free+apps+on+your+iPhone/iPad/iPod+touch!&redirect_uri=http://creditsmob.com'

    })

    $('a.twitter_refer').bind('click', function(e){
        window.location.href = "https://twitter.com/intent/tweet?hashtags=Testing&text=I+am+just+trying+out+stuff&original_refere=www.srajdev.com&related=srajdev&via=srajdev";
    })

    $('a.email_refer').bind('click', function(e){

        window.location.href = "mailto:?subject=Testing&body=I just downloaded awesome free apps";


    })

    $('a.tos').bind('click', function(e){
        window.location.href = "http://srajdev.com/tos";

    })
    
}

$(document).ready(init);

function checkCredits($me){
    credits = $me.find('.credits').attr('val');
    myCredits = $('.my_credits').attr('val');
    if(Number(myCredits) >= Number(credits)){
        return true;
    }
    return false;
}

function emailAjax(email,userId){
    $.ajax({
        type: "POST",
        url: '/ajax_email/',
        data: {'email' : email, 'userId' : userId},
        success: function(data){
            alert(data);
        },
        error : function(){
            alert("Error");
        }
        });
}

function rewardsAjax(email, userId, rewardNo){
    $.ajax({
        type: "POST",
        url: '/ajax_send_reward/',
        data: {'email' : email, 'userId' : userId, 'rewardNo' : rewardNo},
        success: function(data){
            alert(data);
            window.location.reload();
        },
        error :  function(){
            alert("Error!");
        }
    });
}
