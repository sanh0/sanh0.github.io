---
author: Sanh0
pubDatetime: 2023-02-11
title: Javscript 루프의 블록 스코프
postSlug: javascript-loop-block-scope
featured: false
draft: false
tags:
    - javascript
description: let이나 const로 선언된 변수는 해당블록 내에서만 접근 가능하다. 만약 블록이 루프에 연결되면?
---

`let`이나 `const`로 선언된 변수는 해당 블록 내에서만 접근 가능하다.

```js
function anotherBlockExaple(str) {
	if (str) {
		let index = str.indexOf('X');
		if (index != -1) {
			str = str.substring(0, index);
		}
	}
	// 여기서 'index'를 사용할 수 없다. 블록 외부이다.
}
anotherBlockExaple();
```

[의문]
블록이 루프에 연결되면?

-   모든 루프 반복이 동일한 변수를 사용할까?
-   각 반복마다 별도의 변수가 생성될까?
-   루프 내에서 생성된 클로저는 어떻게 작동할까?

[해답]
함수에 대한 호출이 각각 고유한 지역 변수를 얻는 것과 비슷한 방식으로,
루프 반복 역시 저마다의 고유한 블록 변수를 얻는다.

이러한 블록 스코프를 사용하여 오랜 문제였전 '루프 내 클로저'를 해결할 수 있다.

# 루프 내 클로저 문제

```js
function closuresInLoopsProblem() {
	for (var counter = 1; counter <= 3; ++counter) {
		setTimeout(function () {
			console.log(counter);
		}, 10);
	}
}
closuresInLoopsProblem();
```

(`setTimeout은` 무시하자. 이것은 비동기 작업을 의미하는 상징일 뿐이다.)

코드가 1, 2, 3을 출력할 것 같지만 실제로는 4, 4, 4를 출력한다. 루프가 끝날 때까지 각 타이머가 콜백을 실행하지 않기 때문이다. 콜백을 호출할 때까지 `counter`의 값은 4이고, var로 선언되었기 때문에 `counter`는 `closuresInLoopsProblem` 함수 전체에서 정의된다. 세 타이머 콜백은 모두 동일한 `counter` 변수를 통해 감싸지므로 모두 값 4를 본다.

ES5 및 이전 버전에서 이를 해결하는 일반적인 방법은

1. 다른 함수를 도입하고
2. `counter`를 인수로 전달한 다음
3. console.log에서 `counter`대신 해당 인수를 사용
   하는 것이다.

이 방법은 주로 아래와 같이 인라인 익명 함수를 통해 이루어지곤 했다.

```js
function closuresInLoopsES5() {
	for (var counter = 1; counter <= 3; ++counter) {
		(function (value) {
			setTimeout(function () {
				console.log(value);
			}, 10);
		})(counter);
	}
}
closuresInLoopsES5();
```

위의 코드를 실행하면 타이머 함수가 `counter` 대신 `value`를 사용하기 때문에, 의도대로 1, 2, 3을 출력한다. 익명 wrapper 함수에 대한 각 호출은 타이머 함수가 종료될 때의 자체 `value` 매개변수를 가져온다. 이러한 `value` 매개변수는 변경되지 않으므로 예상 값이 출력되는 것이다.

뭔가 복잡하다. 그렇지만, 이제는 ES2015의 `let` 덕분에 훨씬 더 간단하게 해결할 수 있게 되었다.

`var`를 `let`으로 변경해보자.

```js
function closuresInLoopsWithLet() {
	for (let counter = 1; counter <= 3; ++counter) {
		setTimeout(function () {
			console.log(counter);
		}, 10);
	}
}
closuresInLoopsWithLet();
```

코드를 실행해보면 예상대로 1, 2, 3이 출력된다. 어떻게 작동하는 걸까?

익명 함수에 대한 호출이 타이머 함수에 대한 여러 value 매개변수를 생성한 것처럼, 위 코드의 반복문은 반복할 때마다 생성된 타이머 함수에 대해 하나씩 여러 counter 변수를 생성한다. 반복이 이루어질 때마다 자체 `counter` 변수를 갖는 것이다.
