// Iterative factorial
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; 
    cin >> n;
    unsigned long long res = 1;
    for (int i = 2; i <= n; ++i) res *= i;
    cout << res << '\n';
    return 0;
}
