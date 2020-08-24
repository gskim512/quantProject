$(document).ready(function(){
  bg_height = 0; // 빈값으로 변수를 넣는다.

  $("#lnb ul li").each(function() { // 모든 li를 찾는다.
    var lnb_length = $(this).parent().children("li").length; // li의 자식 li의 갯수를 구한다.

    if(lnb_length > bg_height){
      bg_height = lnb_length * 32; //가장 많은 li를 가지고 있는 메뉴에 32를 곱한다. ( 32는 메뉴 1개의 높이값 )
    }

    $(".bg_lnb").css("height", bg_height); // 가장긴 메뉴의 길이만큼의 크기를 메뉴 배경의 높이로 준다.
  });

// 1Depth 열림
  $('#lnb > ul > li > a').on('mouseover keyup',function(){ // 1뎁스에 있는 메뉴에 마우스 올리거나 초점이 왔을때
    $('#lnb > ul ul').stop().slideDown(); // 모든 2뎁스가 슬라이드 다운된다. stop은 왔다갔다 하는걸 방지하는것
    $(this).parents('#lnb').next('.bg_lnb').stop().slideDown();	// 선택된 메뉴에 덮을 배경을 슬라이드 다운한다.
  });

// 2Depth 열림
  $('#lnb > ul > li').on('mouseover keyup',function(){ // 2Depth에 마우스나 초점이 왔을때

    var idx = $(this).index() + 1;	//현재 몇번째 메뉴가 선택되었는지 저장

    $(this).parent("ul").find("ul").show();
    $(this).siblings('li').removeClass('bg'); // 현재 선택된 메뉴를 제외한 나머지 li에 배경클래스를 빼준다.
    $(this).addClass('bg'); // 현재 선택된 메뉴에 배경클래스를 넣어준다.
    $('.bg_lnb').attr('class','bg_lnb').addClass('dep' + idx); //현재 선택된 메뉴의 번호와 전체배경의 번호의 클래스명을 맞춰 같은 디자인을 표현한다.
  });

// 1Depth 닫힘
  $('#lnb > ul').on('mouseleave',function(){ // 1depth 밖으로 마우스가 나갔을경우
    $(this).find('ul').stop().slideUp(); // 2depth메뉴가 모두 닫힌다.
    $(this).parents('#lnb').next('.bg_lnb').stop().slideUp(); // 전체 배경이 닫힌다.
    $('#lnb > ul').removeAttr("style"); //입력된 높이를 제거한다.
    $(this).children("li").removeClass("bg"); // 1depth li에 배경클래스를 빼준다.
  });

// 대메뉴에 초점이 없을때
  $('#lnb > ul > li:last-child li:last-child a').on('focusout',function(){ // 대메뉴의 마지막 링크에 초점이 빠저 나갔을때
    $('#lnb > ul ul').stop().slideUp(); //모든 2depth 닫힘
    $('.bg_lnb').stop().slideUp(); //배경 닫힘
    $("#lnb li").removeClass('bg'); // 1depth li에 배경클래스를 빼준다.
  });

});
