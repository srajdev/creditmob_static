var jQT = new $.jQTouch({
    statusBar: 'black-translucent',
});


var init = function(){
    $('a.no_udid').bind('tap', function (e){
        if(confirm('You need to register your Device first before you can install apps and earn credits')){
            window.location.href = 'http://srajdev.com/media/images/signed.mobileconfig';
        }
        e.preventDefault();
        e.stopPropagation()
    })

    $('a.has_udid').live('click', function (e){
        var $action_url = $(this).attr('action_url');
        window.location.href = $action_url;

        e.preventDefault();
    })

    $('a.no_email').live('tap' ,  function(e){
        $me = $(this);
        haveEnough = checkCredits($me);
        if(haveEnough){
            var user_id = $(this).attr('user_id');
            var retVal = prompt("Rewards are sent via email within 48 hours. Before you can redeem this reward, we will need to verify your email address. Please enter your email address below. \nNote: Your email address will never be shared with any 3rd parties ");
            if(retVal){
                emailAjax(retVal, user_id);   
            }
        }
        else{
            alert('Sorry you dont have enough credits');
        }
    })

    $('a.not_verified').live('tap', function(e){
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

    $('a.has_email').live('tap', function(e){
        $me = $(this);
        haveEnough = checkCredits($me);
        if(haveEnough){
            var email = $(this).attr('email');
            if(confirm('Your reward will be sent to ' + email + 'within 24 hours.\n If you want to change your email address please press cancel and use the rewards page')){
                var userId = $(this).attr('user_id');
                var rewardNo = $(this).attr('rewards_no');
                rewardsAjax(email, userId, rewardNo);
            }
        }
        else{
            alert('Sorry you dont have enough credits');
        }
    })

    $('a.facebook_refer').live('click', function(e){
        window.location.href = 'http://www.facebook.com/dialog/feed?app_id=122537121128186&link=http%3A%2F%2Fsrajdev.com%2Ftrial&picture=http%3A%2F%2Fsrajdev.com%2Fmedia%2Fimages%2Falert.png&name=AppStream&caption=Earn+money+using+our+app&description=Earn+Money+via+us&redirect_uri=http://srajdev.com/trial';
        

    })

    $('a.twitter_refer').live('click', function(e){
        window.location.href = "https://twitter.com/intent/tweet?hashtags=Testing&text=I+am+just+trying+out+stuff&original_refere=www.srajdev.com&related=srajdev&via=srajdev";
    })

    $('a.email_refer').live('click', function(e){

        window.location.href = "mailto:?subject=Testing&body=I just downloaded awesome free apps";


    })
    
}

$(document).ready(init);

function checkCredits($me){
    credits = $me.find('.credits').attr('val');
    myCredits = $('.my_credits').attr('val');
    if(Number(myCredits) > Number(credits)){
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
        },
        error :  function(){
            alert("Error!");
        }
    });
}

/*
addEventListener("load", function() { 
        
setTimeout(hideURLbar, 100); 


}, false); 
function hideURLbar(){ 

    if(window.navigator.standalone != true) {
        if(!navigator.userAgent.match(/iPad/i))
        {
            window.scrollTo(0,1);//scroll on iPhone only
            again a test
        }
    }
}*/
