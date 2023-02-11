---
author: Sanh0
pubDatetime: 2023-01-28
title: Git 환경설정
postSlug: git-config
featured: false
draft: false
tags:
    - git
description: Git 초기 환경설정 / git config 설정하기
---

# 초기 환경설정

### config

```
$ git config 설정값
```

-   처음 실행시 새로운 config 파일을 생성
-   이전에 설정한 환경 파일이 있으면 기존 파일을 수정
-   `--unset` 옵션을 사용하면 기존 환경 파일을 삭제

### config --global

-   깃은 협업 도구이기 때문에, 각 개발자의 작업을 구분해야함
-   이를 위해 사용자를 등록하는 과정을 거침
-   혼자서 사용하는 컴퓨터라면, 보통 컴퓨터 전역에 사용자를 등록함
-   `--global` 옵션을 사용

```
$ git config --global user.name "사용자이름"
$ git config --global user.email "이메일주소"
```

-   **전역이 아닌** 개별 레파지토리에만 적용되도록 설정하기를 원할 경우, `--global` 옵션을 제외하여 입력한다.
    -   각 레파지토리 별로 사용자 설정 값을 다르게 할 수 있다.
    -   전역 사용자 등록을 한뒤,
        -   특정 레파지토리에 로컬 사용자 등록을 하면 로컬값이 적용된다
        -   따로 등록하지 않으면 자동으로 전역값이 적용된다
