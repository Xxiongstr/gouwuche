$(function () {
    var tatol = localStorage.getItem('totalzong')
    $('#tatol').html(tatol)
    $('#totalsum').html(tatol+'元')
    $.ajax({
        url: 'https://www.yjyan.cn/mi/carslistApi.php',
        type: 'get',
        data: {},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                var innerhtml = ` 
                <tr class='tr'>
                    <td style="text-align: center;"><input value="${data[i].cid}" class="cid" style="display:none;"><img src=${data[i].thumb}></td>
                    <td>${data[i].cname}${data[i].attr}</td>
                    <td style="text-align: center;">${data[i].price}×<span class="num"></span></td> 
                    <td style="text-align: center;">×39999</td>
                </tr>
                `
                console.log(data[i]);
                $('.tale').append(innerhtml)
            }
            $('.tr').hide()
            var log = localStorage.getItem('checkedid')
            var num = localStorage.getItem('number')
            console.log(num);
                for(var i = 0;i<log.length;i++){
                    // console.log(log[i]);
                    $('.tr .cid').each(function(){
                        if($(this).val() == log[i]){
                        
                            $(this).parents('.tr').show()
                        }
                    })
                }
                $('.tr .cid').each(function(){
                    for(var i = 0;i<num.length;i++){
                        // console.log(Number(num[i]));
                        // console.log(parseInt(num[i]));
                        // if(Number(num[i]) == isNaN){
                        //     console.log(num[i]);
                        // }
                        $(this).parents('tr').find('.num').html(num[i])
                    }
                })
        },
        error: function () {

        }
    })
    sum()
    function sum(){
        var log = localStorage.getItem('checkedid')
        var sum = 0
        for(var i = 0;i<log.length;i++){
        $('.tr .cid').each(function(){
            if($(this).val() == log[i]){
                sum++
            }
        })
        
    }
    $('#jian').html(sum+'件')
    }
    $('.incontent .newcity').hover(function(){
        $('.newcity').css('borderColor','grey')
        $('.newcity span').css('color','grey')
    },function(){
        $('.newcity').css('borderColor','#e0e0e0')
        $('.newcity span').css('color','#e0e0e0')
    })
    $('.incontent .newcity').click(function(){
        $('.flex').css('visibility','visible')
    })
    $('.divcenter input,.divcenter textarea').focus(function(){
        $(this).css({
            'border-color':'red',
            'outline':'none'
        })
    })
    $('.divcenter input,.divcenter textarea').blur(function(){
        $(this).css({
            'border-color':'#ccc',
        })
    })
    $('.con i,.divfloor button:last-child').click(function(){
        $('.flex').css('visibility','hidden')
    })
    
})