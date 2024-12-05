use std::io::{BufRead, BufReader};
use std::fs::File;
use regex::Regex;

pub fn solution_a () {
    let reader = BufReader::new(File::open("data/day3.txt").expect("Cannot open file.txt"));

    let mut data = Vec::new();
    for line in reader.lines() {
        let line = line.unwrap();
        data.push(line);
    }

    let long_string = data.join("");
    let re = Regex::new(r"mul\(\d+,\d+\)").unwrap();

    let result = re
        .find_iter(&long_string)
        .map(|x| x.as_str())
        .map(|x| {
            let mut split = x[4..x.len()-1].split(",");
            let a = split.next().unwrap().parse::<i32>().unwrap();
            let b = split.next().unwrap().parse::<i32>().unwrap();
            a * b
        }).sum::<i32>();

    println!("Solution A: {:?}", result);
}

pub fn solution_b () {
    let reader = BufReader::new(File::open("data/day3.txt").expect("Cannot open file.txt"));

    let mut data = Vec::new();
    for line in reader.lines() {
        let line = line.unwrap();
        data.push(line);
    }

    let long_string = data.join("");

    let mul_re = Regex::new(r"mul\((\d+),(\d+)\)").unwrap();
    let do_regex = Regex::new(r"do\(\)").unwrap();
    let dont_regex = Regex::new(r"don't\(\)").unwrap();
    
    let do_parts: Vec<&str> = do_regex.split(&long_string).collect();

    let mut parts_without_dont: Vec<&str> = Vec::new();

    for part in do_parts {
        let dont_parts: Vec<&str> = dont_regex.split(part).collect();
        parts_without_dont.push(dont_parts[0]);
    }

    let results = parts_without_dont.iter().map(|x| {
        let result = mul_re
            .find_iter(x)
            .map(|y| y.as_str())
            .map(|y| {
                let mut split = y[4..y.len()-1].split(",");
                let a = split.next().unwrap().parse::<i32>().unwrap();
                let b = split.next().unwrap().parse::<i32>().unwrap();
                a * b
            }).sum::<i32>();
        result
    }).sum::<i32>();

    println!("Solution B: {:?}", results);
}
