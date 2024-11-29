#include<bits/stdc++.h>
using namespace std;
int main(){
    int cnt = 0;
    for(int i=100;i<=999;i++){
        if(i%7==0){
            cnt++;
        }
    }
    cout<<cnt;
}