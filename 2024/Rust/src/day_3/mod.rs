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
