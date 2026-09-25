// NCT好き顔ランキング

const members = [
  "ジャニ","テヨン","ユウタ","クン","ドヨン","テン","ジェヒョン","ウィンウィン",
  "ジョンウ","ルーカス","マーク","シャオジュン","ヘンドリー","ロンジュン","ジェノ",
  "ヘチャン","ジェミン","ヤンヤン","ショウタロウ","ソンチャン","チョンロ","チソン",
  "シオン","リク","ユウシ","ジェヒ","リョウ","サクヤ"
];

const imageNames = {
  "ジャニ": "johnny.jpg",
  "テヨン": "taeyoung.jpg",
  "ユウタ": "yuta.jpg",
  "クン": "kun.jpg",
  "ドヨン": "doyoung.jpg",
  "テン": "ten.jpg",
  "ジェヒョン": "jaehyun.jpg",
  "ウィンウィン": "winwin.jpg",
  "ジョンウ": "jungwoo.jpg",
  "ルーカス": "lucas.jpg",
  "マーク": "mark.jpg",
  "シャオジュン": "xiaojun.jpg",
  "ヘンドリー": "hendery.jpg",
  "ロンジュン": "renjun.jpg",
  "ジェノ": "jeno.jpg",
  "ヘチャン": "haechan.jpg",
  "ジェミン": "jaemin.jpg",
  "ヤンヤン": "yangyang.jpg",
  "ショウタロウ": "shotaro.jpg",
  "ソンチャン": "sungchan.jpg",
  "チョンロ": "chenle.jpg",
  "チソン": "jisung.jpg",
  "シオン": "sion.jpg",
  "リク": "riku.jpg",
  "ユウシ": "yushi.jpg",
  "ジェヒ": "jaehee.jpg",
  "リョウ": "ryo.jpg",
  "サクヤ": "sakuya.jpg"
};


/* =========================
   HTML要素
========================= */

const startScreen =
  document.getElementById("start-screen");

const rankingScreen =
  document.getElementById("ranking-screen");

const startButton =
  document.getElementById("start-button");

const memberArea =
  document.getElementById("member-area");

const nextButton =
  document.getElementById("next-button");

const instruction =
  document.getElementById("instruction");


/* =========================
   ゲーム状態
========================= */

let currentRound = 1;
let currentMembers = [];
let currentGroup = 0;
let groupSelections = [];
let finalists = [];
let round1Members = [];
let finalRanking = [];
let currentRankPosition = 0;
let history = [];
let currentScreen = "";


/* =========================
   戻るボタン
========================= */

const backButton =
  document.createElement("button");

backButton.textContent =
  "← ひとつ前にもどる";

backButton.style.display =
  "none";

backButton.style.marginTop =
  "15px";

backButton.style.padding =
  "12px 30px";

backButton.style.border =
  "1px solid #333";

backButton.style.borderRadius =
  "30px";

backButton.style.background =
  "#fff";

backButton.style.color =
  "#333";

backButton.style.fontSize =
  "14px";

backButton.style.cursor =
  "pointer";

rankingScreen.appendChild(
  backButton
);


/* =========================
   初期状態
========================= */

startScreen.style.display =
  "flex";

rankingScreen.style.display =
  "none";


/* =========================
   スタート
========================= */

startButton.addEventListener(
  "click",
  function () {
    startGame();
  }
);


/* =========================
   ゲーム開始
========================= */

function startGame() {

  rankingScreen.classList.remove(
    "final-mode"
  );

  startScreen.style.display =
    "none";

  rankingScreen.style.display =
    "block";


  currentRound = 1;
  currentMembers = [];
  currentGroup = 0;
  groupSelections = [];
  finalists = [];
  round1Members = [];
  finalRanking = [];
  currentRankPosition = 0;
  history = [];
  currentScreen = "";


  startRound(members);
}


/* =========================
   シャッフル
========================= */

function shuffle(array) {

  const newArray =
    [...array];

  for (
    let i = newArray.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    const temp =
      newArray[i];

    newArray[i] =
      newArray[j];

    newArray[j] =
      temp;
  }

  return newArray;
}


/* =========================
   ROUND開始
========================= */

function startRound(memberList) {

  currentMembers =
    shuffle(memberList);

  currentGroup = 0;

  groupSelections = [];

  showGroup();
}


/* =========================
   4人表示
========================= */

function showGroup() {

  currentScreen =
    "group";

  nextButton.onclick =
    null;

  memberArea.innerHTML =
    "";


  const start =
    currentGroup * 4;

  const end =
    start + 4;

  const group =
    currentMembers.slice(
      start,
      end
    );


  instruction.textContent =
    "ROUND " +
    currentRound +
    "　好きなメンバーを選んでね♡";


  group.forEach(
    function (member) {
      createMemberCard(member);
    }
  );


  const previousSelection =
    groupSelections[currentGroup] ||
    [];


  const cards =
    document.querySelectorAll(
      ".member-card"
    );


  cards.forEach(
    function (card) {

      const name =
        card.querySelector(
          ".member-name"
        ).textContent;

      if (
        previousSelection.includes(
          name
        )
      ) {

        card.classList.add(
          "selected"
        );
      }

    }
  );


  nextButton.style.display =
    "block";

  nextButton.textContent =
    "次へ";

  nextButton.dataset.special =
    "false";


  if (
    currentGroup > 0 ||
    history.length > 0
  ) {

    backButton.style.display =
      "block";

  } else {

    backButton.style.display =
      "none";
  }
}


/* =========================
   メンバーカード
========================= */

function createMemberCard(member) {

  const card =
    document.createElement("div");

  card.className =
    "member-card";


  const image =
    document.createElement("img");

  image.className =
    "member-image";

  image.src =
    "images/" +
    imageNames[member];

  image.alt =
    member;


  image.onerror =
    function () {
      image.style.display =
        "none";
    };


  const name =
    document.createElement("div");

  name.className =
    "member-name";

  name.textContent =
    member;


  card.appendChild(image);
  card.appendChild(name);


  card.addEventListener(
    "click",
    function () {

      card.classList.toggle(
        "selected"
      );

    }
  );


  memberArea.appendChild(card);
}


/* =========================
   現在の選択を保存
========================= */

function saveCurrentGroupSelection() {

  const selected = [];


  const cards =
    document.querySelectorAll(
      ".member-card.selected"
    );


  cards.forEach(
    function (card) {

      const name =
        card.querySelector(
          ".member-name"
        ).textContent;

      selected.push(name);

    }
  );


  groupSelections[currentGroup] =
    selected;
}


/* =========================
   全選択取得
========================= */

function getAllGroupSelections() {

  let selected = [];


  groupSelections.forEach(
    function (group) {

      if (group) {

        selected =
          selected.concat(group);

      }

    }
  );


  return selected;
}


/* =========================
   履歴保存
========================= */

function saveHistory() {

  history.push({

    screen:
      currentScreen,

    round:
      currentRound,

    members:
      [...currentMembers],

    group:
      currentGroup,

    selections:
      groupSelections.map(
        function (group) {

          if (group) {
            return [...group];
          }

          return group;
        }
      ),

    finalists:
      [...finalists],

    round1Members:
      [...round1Members]

  });
}


/* =========================
   履歴復元
========================= */

function restoreHistory() {

  if (
    history.length === 0
  ) {
    return;
  }


  const state =
    history.pop();


  currentRound =
    state.round;

  currentMembers =
    [...state.members];

  currentGroup =
    state.group;


  groupSelections =
    state.selections.map(
      function (group) {

        if (group) {
          return [...group];
        }

        return group;
      }
    );


  finalists =
    [...state.finalists];

  round1Members =
    [...state.round1Members];


  if (
    state.screen ===
    "group"
  ) {

    showGroup();

    return;
  }


  if (
    state.screen ===
    "roundEnd"
  ) {

    showRoundEnd();

    return;
  }
}


/* =========================
   次へ
========================= */

nextButton.addEventListener(
  "click",
  function () {

    if (
      nextButton.dataset.special ===
      "true"
    ) {
      return;
    }


    if (
      currentScreen ===
      "group"
    ) {

      saveCurrentGroupSelection();


      const totalGroups =
        Math.ceil(
          currentMembers.length / 4
        );


      currentGroup++;


      if (
        currentGroup <
        totalGroups
      ) {

        showGroup();

      } else {

        finishRound();
      }


      return;
    }


    if (
      currentScreen ===
      "roundEnd"
    ) {

      goToNextStage();
    }

  }
);


/* =========================
   ROUND終了
========================= */

function finishRound() {

  const selected =
    getAllGroupSelections();


  finalists =
    [...selected];


  const count =
    finalists.length;


  if (
    currentRound === 1
  ) {

    round1Members =
      [...finalists];


    if (
      count <= 8
    ) {

      showRestartMessage();

      return;
    }
  }


  if (
    count === 0
  ) {

    showRestartMessage();

    return;
  }


  showRoundEnd();
}


/* =========================
   ROUND終了画面
========================= */

function showRoundEnd() {

  currentScreen =
    "roundEnd";


  memberArea.innerHTML =
    "";


  instruction.textContent =
    "ROUND " +
    currentRound +
    " 終了！🎉";


  const message =
    document.createElement("p");


  message.textContent =
    finalists.length +
    "人が次へ進みます！";


  memberArea.appendChild(
    message
  );


  nextButton.style.display =
    "block";

  nextButton.textContent =
    "次へ";

  nextButton.dataset.special =
    "false";


  backButton.style.display =
    "block";
}


/* =========================
   8人以下
========================= */

function showRestartMessage() {

  currentScreen =
    "restart";


  memberArea.innerHTML =
    "";


  instruction.textContent =
    "もう一度選んでね！";


  const message =
    document.createElement("p");


  message.textContent =
    "8人以下になったため、最初からやり直します。";


  memberArea.appendChild(
    message
  );


  nextButton.style.display =
    "block";

  nextButton.textContent =
    "最初からやり直す";

  nextButton.dataset.special =
    "true";


  backButton.style.display =
    "none";


  nextButton.onclick =
    function () {
      startGame();
    };
}


/* =========================
   次のステージ
========================= */

function goToNextStage() {

  saveHistory();


  const count =
    finalists.length;


  if (
    count === 9
  ) {

    startFinalRanking();

    return;
  }


  if (
    count >= 10 &&
    count <= 15
  ) {

    startNineSelection();

    return;
  }


  if (
    count >= 16
  ) {

    currentRound++;

    startRound(finalists);

    return;
  }


  if (
    count <= 8
  ) {

    startAdditionalSelection();

    return;
  }
}


/* =========================
   10〜15人 → 9人
========================= */

function startNineSelection() {

  currentScreen =
    "nineSelection";


  currentMembers =
    shuffle(finalists);


  memberArea.innerHTML =
    "";


  instruction.textContent =
    "残り" +
    currentMembers.length +
    "人から9人選んでね♡";


  currentMembers.forEach(
    function (member) {
      createMemberCard(member);
    }
  );


  nextButton.style.display =
    "block";

  nextButton.textContent =
    "9人を決定";

  nextButton.dataset.special =
    "true";


  backButton.style.display =
    "block";


  nextButton.onclick =
    function () {

      const selected =
        getSelectedMembers();


      if (
        selected.length !== 9
      ) {

        alert(
          "9人選んでください！\n現在 " +
          selected.length +
          "人選択しています。"
        );

        return;
      }


      finalists =
        [...selected];


      startFinalRanking();
    };
}


/* =========================
   追加選択
========================= */

function startAdditionalSelection() {

  currentScreen =
    "additionalSelection";


  const need =
    9 - finalists.length;


  const candidates =
    round1Members.filter(
      function (member) {

        return !finalists.includes(
          member
        );

      }
    );


  currentMembers =
    shuffle(candidates);


  memberArea.innerHTML =
    "";


  instruction.textContent =
    "あと" +
    need +
    "人選んでください♡";


  currentMembers.forEach(
    function (member) {
      createMemberCard(member);
    }
  );


  nextButton.style.display =
    "block";

  nextButton.textContent =
    "決定";

  nextButton.dataset.special =
    "true";


  backButton.style.display =
    "block";


  nextButton.onclick =
    function () {

      const selected =
        getSelectedMembers();


      if (
        selected.length !== need
      ) {

        alert(
          "あと" +
          need +
          "人選んでください！\n現在 " +
          selected.length +
          "人選択しています。"
        );

        return;
      }


      finalists =
        finalists.concat(
          selected
        );


      startFinalRanking();
    };
}


/* =========================
   選択中メンバー取得
========================= */

function getSelectedMembers() {

  const selected = [];


  const cards =
    document.querySelectorAll(
      ".member-card.selected"
    );


  cards.forEach(
    function (card) {

      const name =
        card.querySelector(
          ".member-name"
        ).textContent;

      selected.push(name);

    }
  );


  return selected;
}


/* =========================
   最終順位開始
========================= */

function startFinalRanking() {

  currentScreen =
    "finalSelection";


  finalRanking = [];

  currentRankPosition = 0;


  showRankSelection();
}


/* =========================
   最終順位選択
========================= */

function showRankSelection() {

  currentScreen =
    "finalSelection";


  rankingScreen.classList.add(
    "final-mode"
  );


  memberArea.innerHTML =
    "";


  if (
    currentRankPosition >= 9
  ) {

    showFinalRanking();

    return;
  }


  const rank =
    currentRankPosition + 1;


  instruction.textContent =
    rank +
    "位を選んでね♡";


  const remainingMembers =
    finalists.filter(
      function (member) {

        return !finalRanking.includes(
          member
        );

      }
    );


  for (
    let i = 0;
    i < 9;
    i++
  ) {

    if (
      i < remainingMembers.length
    ) {

      createRankCard(
        remainingMembers[i]
      );

    } else {

      const emptyCard =
        document.createElement("div");

      emptyCard.className =
        "final-empty-card";

      memberArea.appendChild(
        emptyCard
      );
    }
  }


  nextButton.style.display =
    "none";

  backButton.style.display =
    "block";
}


/* =========================
   最終順位カード
========================= */

function createRankCard(member) {

  const card =
    document.createElement("div");

  card.className =
    "member-card";


  const image =
    document.createElement("img");

  image.className =
    "member-image";

  image.src =
    "images/" +
    imageNames[member];

  image.alt =
    member;


  image.onerror =
    function () {
      image.style.display =
        "none";
    };


  const name =
    document.createElement("div");

  name.className =
    "member-name";

  name.textContent =
    member;


  card.appendChild(image);
  card.appendChild(name);


  card.addEventListener(
    "click",
    function () {

      if (
        finalRanking.includes(
          member
        )
      ) {
        return;
      }


      finalRanking.push(
        member
      );


      currentRankPosition++;


      showRankSelection();

    }
  );


  memberArea.appendChild(
    card
  );
}


/* =========================
   最終結果
========================= */

function showFinalRanking() {

  currentScreen =
    "final";


  memberArea.innerHTML =
    "";


  instruction.textContent =
    "あなたのNCT好き顔ランキング♡";


  finalRanking.forEach(
    function (member, index) {

      const card =
        document.createElement("div");

      card.className =
        "member-card";


      /* 順位 */

      const rank =
        document.createElement("div");

      rank.className =
        "final-rank";

      rank.textContent =
        (index + 1) +
        "位";


      /* 写真 */

      const image =
        document.createElement("img");

      image.className =
        "member-image";

      image.src =
        "images/" +
        imageNames[member];

      image.alt =
        member;


      image.onerror =
        function () {
          image.style.display =
            "none";
        };


      /* 名前 */

      const name =
        document.createElement("div");

      name.className =
        "member-name";

      name.textContent =
        member;


      card.appendChild(rank);
      card.appendChild(image);
      card.appendChild(name);


      memberArea.appendChild(
        card
      );

    }
  );


  nextButton.style.display =
    "block";

  nextButton.textContent =
    "もう一度最初から選ぶ";

  nextButton.dataset.special =
    "true";


  backButton.style.display =
    "none";


  nextButton.onclick =
    function () {

      currentRound = 1;
      currentMembers = [];
      currentGroup = 0;
      groupSelections = [];
      finalists = [];
      round1Members = [];
      finalRanking = [];
      currentRankPosition = 0;
      history = [];
      currentScreen = "";


      rankingScreen.classList.remove(
        "final-mode"
      );


      rankingScreen.style.display =
        "none";

      startScreen.style.display =
        "flex";

    };
}


/* =========================
   戻るボタン
========================= */

backButton.addEventListener(
  "click",
  function () {

    /* 最終順位選択 */

    if (
      currentScreen ===
      "finalSelection"
    ) {

      if (
        currentRankPosition === 0
      ) {

        rankingScreen.classList.remove(
          "final-mode"
        );

        restoreHistory();

        return;
      }


      const previousRankIndex =
        currentRankPosition - 1;


      finalRanking.splice(
        previousRankIndex,
        1
      );


      currentRankPosition =
        previousRankIndex;


      showRankSelection();

      return;
    }


    /* 9人選択 */

    if (
      currentScreen ===
      "nineSelection"
    ) {

      restoreHistory();

      return;
    }


    /* 追加選択 */

    if (
      currentScreen ===
      "additionalSelection"
    ) {

      restoreHistory();

      return;
    }


    /* 通常の4人選択 */

    if (
      currentScreen ===
      "group"
    ) {

      if (
        currentGroup > 0
      ) {

        saveCurrentGroupSelection();

        currentGroup--;

        showGroup();

        return;
      }


      if (
        history.length > 0
      ) {

        restoreHistory();

        return;
      }
    }


    /* ROUND終了画面 */

    if (
      currentScreen ===
      "roundEnd"
    ) {

      const totalGroups =
        Math.ceil(
          currentMembers.length / 4
        );


      currentGroup =
        totalGroups - 1;


      showGroup();

      return;
    }

  }
);