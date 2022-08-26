$(function () {
    $('.bigdiv ul li button').hide()
    $('.bigdiv ul li').hover(function () {
        index = $(this).index()
        $('.bigdiv ul li button').eq(index).show()
        $('.bigdiv ul li button').animate()
        $('.bigdiv ul li p span:last-child').eq(index).hide()
    }, function () {
        $('.bigdiv ul li button').eq(index).hide()
        $('.bigdiv ul li p span:last-child').eq(index).show()
    })
    
    $('.shoppingright button:last-child').click(function(){
        var arr = []
        var number = []
        $('.checBox').each(function(){
            if($(this).prop('checked')==true){
                var cid = $(this).val()
                arr.push(cid)
                var num =  $(this).parents('tr').find('.num').val()
                number.push(num)
                localStorage.setItem('checkedid',arr)
                localStorage.setItem('number',number)
            }
        })
        var tatol = $('#money').html()
        localStorage.setItem('totalzong',tatol)
        console.log(arr);
    })
    $.ajax({
        url: 'https://www.yjyan.cn/mi/carslistApi.php',
        type: 'get',
        data: {},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                var check = data[i].isSelected == 0 ? "" : "checked"
                var innerhtml = ` 
                <tr class="tr">
                    <td><input type="checkbox" ${check} class="checBox" value="${data[i].cid}"></td>
                    <td class="tdtwo"> <img src=${data[i].thumb} align="center"> ${data[i].cname} ${data[i].attr}</td>
                    <td class = "price">${data[i].price}</td>
                    <td><button class="jian">-</button><input type="num" class="num" value="${data[i].cnt}"><button class="add">+</button></td>
                    <td class="accounting">${data[i].price*data[i].cnt}</td>
                    <td class="del"><a href="#"><i class="iconfont" style="font-size:27px">&#xe607;</i></a></td>
            </tr>
                `
                $('.tbody').append(innerhtml)
                
            }
        },
        error: function () {
                
        }
    })
    
        
    if($('.checBox').length == $('.checBox:checked').length){
        $('#quanbox').prop('checked',true)
    }else{
        $('#quanbox').prop('checked',false)
    }
    $('#quanbox').click(function () {
        if($(this).prop('checked') == true){
            $('.shopping .shoppingright li:last-child button').css('backgroundColor',"#FF6700")
            $('#aler').css('display','none')
        }else{
            $('.shopping .shoppingright li:last-child button').css('backgroundColor',"#E0E0E0")
            $('#aler').css('display','block')
        }
        var state =  $(this).prop('checked') == true ? 1:0
        var s = 0
        $('.checBox').each(function(){
            $.ajax({
                url: 'https://www.yjyan.cn/mi/editstatusApi.php',
                type: 'get',
                data: {
                    cid:$(this).val(),
                    status:state
                },
                dataType: 'json',
                async: false,
                success:function(data){
                    s++
                    console.log(data);
                }
            })
        })
        if(s==$('.checBox').length){
            $('.checBox').prop('checked',$(this).prop("checked"))
        }
        totalCoun()
        tatalMoney()
    })

    if($('.checBox:checked').length>0){
        $('.shopping .shoppingright li:last-child button').css('backgroundColor',"#FF6700")
        $('#aler').css('display','none')
    }else{
        $('.shopping .shoppingright li:last-child button').css('backgroundColor',"#E0E0E0")
        $('#aler').css('display','block')
    }

    $('.shopping .shoppingright li:last-child button').click(function(){
        if($('.checBox:checked').length>0){
                location.href= 'regit4.html'
        }else{
                location.href= '#'
        }
    })
    
    $('.table').on('click','.checBox',function(){
        if($('.checBox:checked').length>0){
            $('.shopping .shoppingright li:last-child button').css('backgroundColor',"#FF6700")
            
            $('#aler').css('display','none')
        }else{
            $('.shopping .shoppingright li:last-child button').css('backgroundColor',"#E0E0E0")
            $('#aler').css('display','block')
        }
        var state = $(this).prop('checked') == true ? 1:0
            $.ajax({
                url: 'https://www.yjyan.cn/mi/editstatusApi.php',
                type: 'get',
                data: {
                    cid:$(this).val(),
                    status:state
                },
                dataType: 'json',
                success:function(data){
                    console.log(data);
                }
            })
            if($('.checBox').length == $('.checBox:checked').length){
                $('#quanbox').prop('checked',true)
            }else{
                $('#quanbox').prop('checked',false)
            }
            
            totalCoun()
            tatalMoney()
    })
    
        $('.table').on('click','.del',function(){
            var isbutton =  $(this).parents('.tr').parents('.tbody').parents('.container').siblings('.bigdingwei').find('.ok')
            carid = $(this).parents('.tr').find('.checBox').val()
            var remove =  $(this)
            isbutton.click(function(){
                remove.parents('.tr').remove()
                $.ajax({
                    url: 'https://www.yjyan.cn/mi/delApi.php',
                    type: 'get',
                    data: {
                        cid:carid
                    },
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                    }
                })
            })
        })
        $('.table').on('click','.add',function(){
            var carid = $(this).parents('.tr').find('.checBox').val()
            console.log(carid);
            var num = $(this).siblings('.num').val()
            num++
            $(this).siblings('.num').val(num)
            // var price = $(this).parents('tr').find('.price').html()
            // var num = $(this).parents('tr').find('.num').val()
            // console.log(num);
            // $(this).parents('tr').find('.accounting').html(price*num)
            // console.log(num);
            $.ajax({
                url: 'https://www.yjyan.cn/mi/editNumApi.php',
                type: 'get',
                data: {
                    cid:carid,
                    num:num
                },
                dataType: 'json',
                success:function(data){
                    console.log(data);
                }
            })
            tatalMoney()
            add('.add')
            
        })
        $('.table').on('click','.jian',function(){
            var carid = $(this).parents('.tr').find('.checBox').val()
            console.log(carid);
            var num = $(this).siblings('.num').val()
            if(num>1){
                num--
            }
            $(this).siblings('.num').val(num)
            console.log(num);
            $.ajax({
                url: 'https://www.yjyan.cn/mi/editNumApi.php',
                type: 'get',
                data: {
                    cid:carid,
                    num:num
                },
                dataType: 'json',
                success:function(data){
                    console.log(data);
                }
            })
            add('.jian')
            tatalMoney()
        })
        $.ajax({
            url: 'https://www.yjyan.cn/mi/huiShouApi.php',
            type: 'get',
            data: {
            },
            dataType:'json',
            success:function(data){
                console.log(data);
            }
        })
        $('.tr').on('click','.del',function(){
            var index = $(this).index()
            console.log(index);
        })
    //checkbox数量
    function add(thiss){
        console.log(thiss);
        $(thiss).each(function(){
            var price = $(this).parents('tr').find('.price').html()
            var num = $(this).siblings('.num').val()
            console.log(num);
            $(this).parents('tr').find('.accounting').html(price*num)
        })
    }
    totalCoun()
    function totalCoun() {
        var s = 0
        $('.checBox').each(function () {
            if($(this).prop('checked')){
                s++
            }
        })
        $('#cnt').html(s)
    }
    //合计
    tatalMoney()
    function tatalMoney() {
        var cont = 0
        $('.checBox').each(function () {
            if($(this).prop('checked')){
                var price = $(this).parents('tr').find('.price').html()
                var num = $(this).parents('tr').find('.num').val()
                var money = price * num
                console.log(money);
                cont += money
                console.log(cont);

            }
        })
        console.log(cont);
        $('#money').html(cont)
    }
    




    $('.tr .del').click(function(){
        $('.bigdingwei').css('visibility','visible')
    })
    $('.bigdingwei .isbotton button:last-child').click(function(){
        $('.bigdingwei').css('visibility','hidden')
    })
    $('.bigdingwei .isbotton button:first-child').click(function(){
        $('.bigdingwei').css('visibility','hidden')
    })
    
        $('.num').blur(function(){
            var carid = $(this).parents('.tr').find('.checBox').val()
            var price = $(this).parents('tr').find('.price').html()
            var num = $(this).val()
            $(this).parents('tr').find('.accounting').html(price*num)
            $.ajax({
                url: 'https://www.yjyan.cn/mi/editNumApi.php',
                type: 'get',
                data: {
                    cid:carid,
                    num:num
                },
                dataType: 'json',
                success:function(data){
                    console.log(data);
                }
            })
            tatalMoney()
            add('.add')
        })
    
})
