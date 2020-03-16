'use strict';
/*idの要素の取得*/
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
/*ボタンが押されたときの動作*/
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    
    if (userName.length === 0) {
        return;
    }
    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    //TODO ツイート機能の作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('愛好家の一曲') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #愛好家の一曲';
    tweetDivided.appendChild(anchor);

    /*const script = document.createElement('script');
    script.setAttribute('src', 'http://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);*/
    twttr.widgets.load();
};
userNameInput.onkeydown = (event) => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
};
const answers = [
    '{userName}の一曲はNIPPONです。ラッキーカラーは混じり気のない気高い青です。',
    '{userName}の一曲は孤独のあかつきです。疲れたときは瞼を閉じて耳を澄ましてみては',
    '{userName}の一曲は人生は夢だらけです。{userName}様の人生ももちろん夢だらけです。',
    '{userName}の一曲は自由へ道連れです。小松菜奈さんの作品を見るのはいかが？',
    '{userName}の一曲は歌舞伎町の女王です。勇気をもって歌舞伎町へ。新たな発見があるかも。',
    '{userName}の一曲は獣行く細道です。本物か贋物なんてナンセンスですよね。',
    '{userName}の一曲は幸福論です。{userName}様,時の流れと空の色に何も望みはしないようにしましょう。',
    '{userName}の一曲は罪と罰です。愛車を真っ二つにしてみては？…冗談です。',
    '{userName}の一曲は長く短い祭です。ラッキードリンクはコカ・コーラです。',
    '{userName}の一曲は青春の瞬きです。時をよ止まれ。',
    '{userName}の一曲はきらきら武士です。お城巡りなんてどうですか？。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharaCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharaCode = sumOfCharaCode + userName.charCodeAt(i);
    }
    //文字コードも番号の合計を回答の数せ和って添字も数値を求める
    const index = sumOfCharaCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);//|{/\userName\}/g:正規表現
    return result;
}
//テストコード
console.assert(
    assessment('太郎') === '太郎の一曲は幸福論です。太郎様,時の流れと空の色に何も望みはしないようにしましょう。',
    '診断結果の文言の特定の部分を名前に置き換える操作が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ名前を出力する操作が正しくありません。'
);
