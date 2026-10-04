import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class USSDMobileBanking {

    private static final Map<String, Double> accounts = new HashMap<>();
    private static final String PIN = "4321";

    public static void main(String[] args) {
        accounts.put("256700000001", 150000.00); // Account Balance in Local Currency
        accounts.put("256700000002", 45000.00);

        Scanner scanner = new Scanner(System.in);
        String currentAccount = "256700000001";

        System.out.println("Simulating USSD Dialing *165# ...");
        System.out.println("Welcome to Community Mobile Money");
        System.out.println("1. Check Balance");
        System.out.println("2. Send Money");
        System.out.println("3. Exit");
        System.out.print("Select Option: ");

        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter 4-Digit PIN: ");
                String inputPin = scanner.next();
                if (inputPin.equals(PIN)) {
                    System.out.printf("Your current balance is: UGX %.2f%n", accounts.get(currentAccount));
                } else {
                    System.out.println("Invalid PIN. Transaction Cancelled.");
                }
                break;

            case 2:
                System.out.print("Enter Recipient Phone Number: ");
                String recipient = scanner.next();
                System.out.print("Enter Amount: ");
                double amount = scanner.nextDouble();
                System.out.print("Enter 4-Digit PIN: ");
                String pinConfirm = scanner.next();

                if (!pinConfirm.equals(PIN)) {
                    System.out.println("Invalid PIN. Transaction Cancelled.");
                } else if (accounts.get(currentAccount) < amount) {
                    System.out.println("Insufficient funds.");
                } else if (!accounts.containsKey(recipient)) {
                    System.out.println("Recipient phone number not registered.");
                } else {
                    accounts.put(currentAccount, accounts.get(currentAccount) - amount);
                    accounts.put(recipient, accounts.get(recipient) + amount);
                    System.out.printf("Success! Transferred UGX %.2f to %s.%n", amount, recipient);
                    System.out.printf("New Balance: UGX %.2f%n", accounts.get(currentAccount));
                }
                break;

            case 3:
                System.out.println("Thank you for using Mobile Banking.");
                break;

            default:
                System.out.println("Invalid option selected.");
        }

        scanner.close();
    }
}