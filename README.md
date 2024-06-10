# `icp`

Task 1: Complete Agorapp Motoko : https://agorapp.dev/ide/icp/motoko/motoko-tutorial/text

Task 2: Complete 2 chapters in : https://nnri3-7qaaa-aaaaj-qa3qa-cai.icp0.io/dao_adventure/chapter_1.html

```
git checkout -b branch_name
git add .
git commit -m
git push origin branch_name
```

Canister calls in terminals

```
 dfx identity get-principal
kacol-2ahpx-qnuwx-dy3sk-yuf4q-3nnap-too2q-zqnwn-n3hvb-u3g6g-iqe
 dfx canister call chapter_2 addMember
This method requires arguments.
Enter a value for Member : record { age : nat; name : text }
Enter field age : nat
  ✔ Enter a nat · 60
Enter field name : text
  ✔ Enter a text (type :e to use editor) · Balu
Sending the following argument:
(record { age = 60 : nat; name = "Balu" })

Do you want to send this message? [y/N]
y
(variant { ok })
 dfx canister call chapter_2 getMember
This method requires arguments.
Auto-completions: anonymous, chapter_1, chapter_2, default, icp_backend, icp_frontend
✔ Enter a principal · kacol-2ahpx-qnuwx-dy3sk-yuf4q-3nnap-too2q-zqnwn-n3hvb-u3g6g-iqe
Sending the following argument:
(principal "kacol-2ahpx-qnuwx-dy3sk-yuf4q-3nnap-too2q-zqnwn-n3hvb-u3g6g-iqe")

Do you want to send this message? [y/N]
y
(variant { ok = record { age = 60 : nat; name = "Balu" } })
harshed@Harsheds-MacBook-Air icp % dfx canister call chapter_2 updateMember
This method requires arguments.
Enter a value for Member : record { age : nat; name : text }
Enter field age : nat
  ✔ Enter a nat · 61
Enter field name : text
  ✔ Enter a text (type :e to use editor) · Balu
Sending the following argument:
(record { age = 61 : nat; name = "Balu" })

Do you want to send this message? [y/N]
y
(variant { ok })
 % dfx canister call chapter_2 getAllMembers
(vec { record { age = 61 : nat; name = "Balu" } })
 % dfx canister call chapter_2 getNoMembers
(1 : nat)
 % dfx canister call chapter_2 removeMember
(variant { ok })
 % dfx canister call chapter_2 getAllMembers
(vec {})
```

Task 3: getallmembers

Task 4: add new member
