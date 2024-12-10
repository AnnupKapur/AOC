use std::collections::{HashMap, HashSet, VecDeque};
use std::fs;

fn parse_input(input: &str) -> (Vec<(u32, u32)>, Vec<Vec<u32>>) {
    let sections: Vec<&str> = input.split("\n\n").collect();
    let rules = sections[0]
        .lines()
        .map(|line| {
            let parts: Vec<u32> = line.split('|').map(|x| x.parse().unwrap()).collect();
            (parts[0], parts[1])
        })
        .collect();

    let updates = sections[1]
        .lines()
        .map(|line| {
            line.split(',')
                .map(|x| x.parse().unwrap())
                .collect::<Vec<u32>>()
        })
        .collect();

    (rules, updates)
}

fn is_valid_order(update: &Vec<u32>, rules: &HashSet<(u32, u32)>) -> bool {
    let mut position = HashMap::new();
    for (i, &page) in update.iter().enumerate() {
        position.insert(page, i);
    }

    for &(x, y) in rules {
        if let (Some(&pos_x), Some(&pos_y)) = (position.get(&x), position.get(&y)) {
            if pos_x >= pos_y {
                return false;
            }
        }
    }

    true
}

fn find_middle(update: &Vec<u32>) -> u32 {
    update[update.len() / 2]
}

fn sort_pages(update: &Vec<u32>, rules: &HashSet<(u32, u32)>) -> Vec<u32> {
    // Build a graph and in-degree map
    let mut graph: HashMap<u32, Vec<u32>> = HashMap::new();
    let mut in_degree: HashMap<u32, usize> = HashMap::new();

    // Initialize graph nodes and in-degree map
    for &page in update {
        graph.entry(page).or_default();
        in_degree.entry(page).or_insert(0);
    }

    // Add edges based on rules
    for &(x, y) in rules {
        if update.contains(&x) && update.contains(&y) {
            graph.entry(x).or_default().push(y);
            *in_degree.entry(y).or_insert(0) += 1;
        }
    }

    // Perform topological sort
    let mut queue: VecDeque<u32> = in_degree
        .iter()
        .filter(|&(_, &degree)| degree == 0)
        .map(|(&page, _)| page)
        .collect();

    let mut sorted = Vec::new();
    while let Some(page) = queue.pop_front() {
        sorted.push(page);
        if let Some(neighbors) = graph.get(&page) {
            for &neighbor in neighbors {
                let entry = in_degree.get_mut(&neighbor).unwrap();
                *entry -= 1;
                if *entry == 0 {
                    queue.push_back(neighbor);
                }
            }
        }
    }

    sorted
}

pub fn solution_a() {
    let input_path = "data/day5.txt";
    // Load input
    let input = fs::read_to_string(input_path).expect("Failed to read input file");
    let (rules, updates) = parse_input(&input);

    // Create a set of rules
    let rules_set: HashSet<(u32, u32)> = rules.into_iter().collect();

    // Process updates
    let mut total_middle_sum = 0;
    for update in updates {
        if is_valid_order(&update, &rules_set) {
            total_middle_sum += find_middle(&update);
        }
    }

    println!("Solution A: {:?}", total_middle_sum);
}

pub fn solution_b() {
    let input_path = "data/day5.txt";
    // Load input
    let input = fs::read_to_string(input_path).expect("Failed to read input file");
    let (rules, updates) = parse_input(&input);

    // Create a set of rules
    let rules_set: HashSet<(u32, u32)> = rules.into_iter().collect();

    // Process updates
    let mut total_middle_sum = 0;
    for update in updates {
        if is_valid_order(&update, &rules_set) {
            continue; // Skip correctly ordered updates
        }

        // Fix the update using topological sort
        let fixed_update = sort_pages(&update, &rules_set);

        // Add the middle page number of the fixed update
        total_middle_sum += find_middle(&fixed_update);
    }

    println!("Solution B: {:?}", total_middle_sum);
}
