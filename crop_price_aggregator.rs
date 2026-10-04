// File Name: crop_price_aggregator.rs

use std::collections::HashMap;

#[derive(Debug, Clone)]
struct MarketPrice {
    crop_name: String,
    market_location: String,
    price_per_kg: f64,
}

struct PriceAggregator {
    records: Vec<MarketPrice>,
}

impl PriceAggregator {
    fn new() -> Self {
        PriceAggregator { records: Vec::new() }
    }

    fn add_price_record(&mut self, crop: &str, location: &str, price: f64) {
        self.records.push(MarketPrice {
            crop_name: crop.to_string(),
            market_location: location.to_string(),
            price_per_kg: price,
        });
    }

    fn get_highest_paying_market(&self, crop: &str) -> Option<MarketPrice> {
        self.records
            .iter()
            .filter(|record| record.crop_name.to_lowercase() == crop.to_lowercase())
            .cloned()
            .max_by(|a, b| a.price_per_kg.partial_cmp(&b.price_per_kg).unwrap())
    }

    fn calculate_average_price(&self, crop: &str) -> Option<f64> {
        let matching_prices: Vec<f64> = self
            .records
            .iter()
            .filter(|r| r.crop_name.to_lowercase() == crop.to_lowercase())
            .map(|r| r.price_per_kg)
            .collect();

        if matching_prices.is_empty() {
            None
        } else {
            let sum: f64 = matching_prices.iter().sum();
            Some(sum / matching_prices.len() as f64)
        }
    }
}

fn main() {
    let mut aggregator = PriceAggregator::new();

    // Input regional market data
    aggregator.add_price_record("Maize", "Central Market", 1.20);
    aggregator.add_price_record("Maize", "Northern Hub", 1.45);
    aggregator.add_price_record("Maize", "Border Trade Post", 1.35);
    aggregator.add_price_record("Beans", "Central Market", 2.10);

    let target_crop = "Maize";

    if let Some(avg) = aggregator.calculate_average_price(target_crop) {
        println!("Average regional price for {}: ${:.2} / kg", target_crop, avg);
    }

    if let Some(best) = aggregator.get_highest_paying_market(target_crop) {
        println!(
            "RECOMMENDATION: Sell {} at '{}' for highest return (${:.2} / kg).",
            best.crop_name, best.market_location, best.price_per_kg
        );
    }
}