from collections import defaultdict, deque

def parse_input(input_data):
    rules_section, updates_section = input_data.strip().split("\n\n")
    rules = [tuple(map(int, line.split("|"))) for line in rules_section.splitlines()]
    updates = [list(map(int, line.split(","))) for line in updates_section.splitlines()]
    return rules, updates

def is_update_valid(update, rules):
    page_indices = {page: idx for idx, page in enumerate(update)}
    for x, y in rules:
        if x in page_indices and y in page_indices:
            if page_indices[x] > page_indices[y]:
                return False
    return True

def sort_pages(update, rules):
    graph = defaultdict(list)
    in_degree = defaultdict(int)

    for page in update:
        graph[page] = []
        in_degree[page] = 0

    # Create graph and calculate in-degrees
    for x, y in rules:
        if x in graph and y in graph:
            graph[x].append(y)
            in_degree[y] = in_degree.get(y, 0) + 1

    # Restrict graph to only the pages in this update
    valid_nodes = set(update)
    graph = {k: [v for v in graph[k] if v in valid_nodes] for k in valid_nodes}
    in_degree = {k: in_degree[k] for k in valid_nodes}

    # Queue of nodes with zero in-degree
    queue = deque([node for node in valid_nodes if in_degree[node] == 0])
    sorted_list = []

    while queue:
        node = queue.popleft()
        sorted_list.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return sorted_list

def reorder_update(update, rules):
    if not update:  # Handle empty updates explicitly
        return []
    return sort_pages(update, rules)

def find_middle_page(update):
    return update[len(update) // 2]

def solve_challenge(input_data):
    rules, updates = parse_input(input_data)
    total = 0

    for update in updates:
        if not is_update_valid(update, rules):  # If invalid, reorder the update
            reordered_update = reorder_update(update, rules)
            if reordered_update:  # Ensure the reordered update is non-empty
                total += find_middle_page(reordered_update)

    return total

text_input = ""
with open("../../data/day5.txt") as file:
    for line in file:
        text_input += line

result = solve_challenge(text_input)
print(result)
