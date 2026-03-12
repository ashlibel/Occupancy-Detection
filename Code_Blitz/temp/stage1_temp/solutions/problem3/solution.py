# Parentheses count checker (iterative)
def parentheses_count_equal(s: str) -> bool:
    open_count = 0
    close_count = 0
    for ch in s:
        if ch == '(':
            open_count += 1
        elif ch == ')':
            close_count += 1
    return open_count == close_count

if __name__ == "__main__":
    s = input().rstrip("\n")
    print(parentheses_count_equal(s))
