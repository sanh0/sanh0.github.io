---
author: Sanh0
pubDatetime: 2023-02-10
title: Javscript let과 const
postSlug: javascript-let-and-const
featured: false
draft: false
tags:
    - javascript
description: let과 const 그리고 var의 차이점
---

# 목차

> -   `let`과 `const`소개
> -   예시와 함께 **블록 스코프** 정의
> -   섀도잉과 호이스팅 : 일시적 데드존
> -   변경해서는 안 되는 변수에 const 사용
> -   전역 객체에 없는 전역 변수 만들기
> -   루프에서 블록 스코프 사용

# 1. `let`과 `const`소개

## 1.1 `let`

-   `var`와 마찬가지로 `let`은 변수를 선언
-   `var`를 사용할 수 있는 모든 곳에서 `let` 사용 가능
-   `var`처럼 `let`은 초기화할 필요 없음
-   선언 후 초기화하지 않은 경우, 변숫값 디폴트는 `undefined`
-   `var`와 `let`의 유사한 점은 이것이 전부이다.
-   위 내용을 제외하면 이 둘은 매우 다르게 동작한다.

## 1.2 `const`

-   `const`는 상수를 선언한다.
-   상수는 값이 변경되지 않는 변수
-   디폴트 값이 없으며, 선언 시점에서 초기화 필요
-   변수 대신 상수를 만들고, 초기화가 필요하다는 점 외에 `const`와 `let`은 동일

# 2. 진짜 블록 스코프

## `var`는 블록에서 튀어나온다

-   var로 블록 내에서 변수 선언 시, 블록 내부뿐만 아니라 외부에서도 사용 가능

```js
function jumpOut() {
	var a = [1, 2, 3];
	for (var 1 = 0; i < a.length; ++i) {
		var value = a[i];
		console.log(value);
	}
	console.log("Outside loop" + value);
	// 왜 'value'를 여기서도 사용할 수 있을까?
}
jumpOut();
```

-   for문 안에서 선언된 `var value`는 루프 외부에서도 접근 가능
    -   문제점 1. 변수는 유지 관리를 위해, 필요한 부분에서만 존재해야야함
    -   문제점 2. 코드의 의도와 실제 동작이 다들 때마다 버그와 유지관리 문제 발생

## `let`과 `const`는 선언된 **블록 내**에서만 존재

```js
function stayContained() {
	var a = [1, 2, 3];
	for (var 1 = 0; i < a.length; ++i) {
		let value = a[i];
		console.log(value);
	}
	console.log("Outside loop" + value);
	// ReferenceError: 'value' is not defined
}
stayContained();
```

-   이 코드에서 `value`는 블록이 의미하는 대로 범위가 지정됨
-   그 밖의 함수 영역에는 존재하지 않음
-   필요한 만큼만 존재 & 의도와 실제 작동이 일치

# 3. 호이스팅과 일시적 데드존

`var` 선언은 호이스팅 된다 (변수를 선언하기 전에 사용할 수 있다)

```js
function exaple() {
	console.log(answer);
	answer = 42;
	console.log(answer);
	var answer = 67;
}
exaple();
```
