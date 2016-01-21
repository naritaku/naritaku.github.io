var a=0;//問題数カウント用変数
var ran=0;//乱数記憶用変数
var obj;//JSONのデータをjsで使えるように
var len;//リストの長さ
var q_num;//まだ出題していない問題のリスト
var mistake="";//間違えた問題をためる
var miss=0;//間違えた数をためる
var mode=0;//ENTERKEYの調整用
var format=0;//出題形式
var choice=[0,1,2,3]//選択肢用
var s_miss=0;

function start(){//設定の変更が終わった時
  var range =document.forms.setting.range.value
  var q =document.forms.setting.q_num.value
  format =document.forms.setting.format.value
  switch (range){
    case '1':
      obj = JSON.parse(text);
      break;
    case '2':
      obj = JSON.parse(test1);
      break;
    case '3':
      obj = JSON.parse(test2);
      break;
    case '4':
      obj = JSON.parse(test3);
      break;
    case '5':
      obj = JSON.parse(test4);
      break;
    case '6':
      obj = JSON.parse(test5);
      break;
    }
  switch (q){
    case '1':
      len=10;
      break;
    case '2':
      len=obj.employees.length;
      break;
    }
  if(len>obj.employees.length){
    len=obj.employees.length;
  }
  load_q();
}

function change_q(){//問題の変更
  mode=0;
  a++;
  document.getElementById("sign").innerHTML="";
  document.getElementById("sign").style.color = "brack";
  var q_ran =Math.floor(Math.random () * q_num.length);
  ran=q_num[q_ran];
  q_num.splice( q_ran , 1 ) ;
  var qes="問題"+ a +":<span onclick='speach();'>"+ obj.employees[ran].jp+"</span>";
  document.getElementById("question").innerHTML=qes;
  switch (format){
    case '1':
      document.getElementById("quiz").innerHTML=
      '<input type="text" name="my-text" id="answer"  pattern="^[A-Za-z]+$"><input type="button" value="決定" onClick="ans()">';
      document.quiz.answer.focus()
      break;
    case '2':

      var q_sel=[];
      var sel=0;
      for (var i=0; i<len; i++) {
        q_sel[i] = i;
      }
      for (var i = 0; i < choice.length; i++) {
        sel=Math.floor(Math.random () * q_sel.length);
        choice[i]=q_sel[sel];
        while(choice[i]===ran){
          sel=Math.floor(Math.random () * q_sel.length);
          choice[i]=q_sel[sel];
        }
        q_sel.splice( sel , 1 ) ;
      }
      choice[Math.floor(Math.random () * 4)]=ran;
      document.getElementById("quiz").innerHTML=
      '<input type="button" id=select0 class="select"><input type="button" id=select1 class="select"><input type="button" id=select2 class="select"><input type="button" id=select3 class="select">';
      for (var i = 0; i < 4; i++) {
        document.getElementById('select'+i).value = obj.employees[choice[i]].en;
      }
      document.getElementById('select0').onclick = function(){select(0);};
      document.getElementById('select1').onclick = function(){select(1);};
      document.getElementById('select2').onclick = function(){select(2);};
      document.getElementById('select3').onclick = function(){select(3);};
      break;
    }
 }

function select(i){//選択:答えが送信されたとき
  if (choice[i]==ran){
    document.getElementById("sign").innerHTML="○    "+ obj.employees[ran].en;
    document.getElementById("sign").style.color = "blue";
    if (s_miss===1) {
      miss++;
      mistake+=obj.employees[ran].jp+"\t"+obj.employees[ran].en+"\n"
      s_miss=0;

    }
    next();
  }else{
    s_miss=1
    document.getElementById('select'+i).value=obj.employees[choice[i]].en+"\n"+obj.employees[choice[i]].jp;
  }
}

function ans(){//書き取り:答えが送信されたとき
  if (document.forms.quiz.answer.value===obj.employees[ran].en){//答えがあっているとき
    document.getElementById("sign").innerHTML="○    "+ obj.employees[ran].en;
    document.getElementById("sign").style.color = "blue";
  }else{//間違っているとき
    document.getElementById("sign").innerHTML="×    "+ obj.employees[ran].en;
    document.getElementById("sign").style.color = "red";
    miss++;
    if (obj.employees[ran].jp.length < 4){
      mistake+=obj.employees[ran].jp+ "\t\t\t" +obj.employees[ran].en+"\n"
    }else if (obj.employees[ran].jp.length < 8){
        mistake+=obj.employees[ran].jp+ "\t\t" +obj.employees[ran].en+"\n"
    }else{
      mistake+=obj.employees[ran].jp+ "\t" +obj.employees[ran].en+"\n"
    }
  }
  next();
}

function next(){//問題の更新か結果表示の分岐
  if( q_num.length===0){
    document.getElementById("quiz").innerHTML='<div class="center"><input type="button" value="結果を表示" onClick="result_q()" class="button" onKeyPress="Key_on(window.event.keyCode)"></div>';
  }else{
    document.getElementById("quiz").innerHTML='<div class="center"><input type="button" value="次へ" onClick="change_q()" class="button" onKeyPress="Key_on(window.event.keyCode)"></div>';
  }
  mode=1;
}

function result_q(){//テスト結果を表示
  document.getElementById("question").innerHTML='テスト結果';
  document.getElementById("sign").innerHTML="";
  if(miss===0){
    var result='<p>正解数: '+ len +'問中/'+(len - miss)+'問<br>間違えた単語:　　なし</p>';
      }else{
    var result='<p>正解数: '+ len +'問中/'+(len - miss)+'問<br>間違えた単語</p><div class="center"><textarea cols="40" rows="8" readonly>'+mistake+'</textarea></div>';
  }
  document.getElementById("quiz").innerHTML=result+'<div class="center"><input type="button" value="初期設定へ" onClick="location.reload();" class="button"><input type="button" value="もう一度" onClick="load_q()" class="button"></div>';

}

function speach(){
    // unsupported.
    if (!'SpeechSynthesisUtterance' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }

    // 話すための機能をインスタンス化して、色々と値を設定します.
    var msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.voiceURI = 'native';
    msg.rate = 1;
    msg.pitch = 2;
    msg.text = obj.employees[ran].en; // しゃべる内容
    msg.lang = "en-US"; // en-US or ja-UP

    // 終了した時の処理
    msg.onend = function (event) {
        console.log('speech end. time=' + event.elapsedTime + 's');
    }

    // テキストスピーチ開始
    speechSynthesis.speak(msg);
};

function load_q(){//変数への代入と問題の基本となるHTMLの表示
  a=0;
  mistake="";
  miss=0;
  q_num = [];
  for (var i=0; i<len; i++) {
    q_num[i] = i;
  }
  document.getElementById("main").innerHTML='<div class="content"><h3 id="question"></h3><p id="sign"></p><form id="quiz" name="quiz" onsubmit="ans();  return false;" autocomplete="off"><br><input type="text" name="answer" id="answer"  pattern="^[A-Za-z]+$"><input type="button" value="回答する" onClick="ans()"></form></div>';
  change_q();
}

//ENTER Keyで問題送り-------------------
document.onkeydown = next1;//押されたとき
function next1(key){
  if (mode===1 && event.keyCode == 13){mode++;}
}

document.onkeyup = next2;//離されたとき
function next2(key){
  if (mode===2 && event.keyCode == 13){
    if( q_num.length===0){
      result_q();
    }else{
      change_q();
    }
  }
}
//------------------------------------
