def is_update_valid(update, rules):
    # Create a map of page indices for quick lookup
    page_indices = {page: idx for idx, page in enumerate(update)}
    
    # Check each rule
    for x, y in rules:
        if x in page_indices and y in page_indices:
            if page_indices[x] > page_indices[y]:  # If X comes after Y, rule is violated
                return False
    return True

def find_middle_page(update):
    return update[len(update) // 2]

def solve_challenge(input_data):
    # Split input into rules and updates
    rules_section, updates_section = input_data.strip().split("\n\n")
    rules = [tuple(map(int, line.split("|"))) for line in rules_section.split("\n")]
    updates = [list(map(int, line.split(","))) for line in updates_section.split("\n")]
    
    total = 0

    for update in updates:
        if is_update_valid(update, rules):  # Check if the update is valid
            total += find_middle_page(update)  # Add the middle page to the total

    return total

text_input = ""
with open("../../data/day5.txt") as file:
    for line in file:
        text_input += line

result = solve_challenge(text_input)
print(result)
