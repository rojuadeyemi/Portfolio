<?php

error_reporting(E_ALL ^ E_NOTICE);

// Enter the recipient email address
$my_email = "rojuadeyemi@yahoo.com";

// Optional: From email address
$from_email = "";

// Subject line
$subject = isset($_REQUEST['subject']) ? stripslashes($_REQUEST['subject']) : '';

// Continue link (optional)
$continue = "/";

// Initialize error array
$errors = [];

// Remove $_COOKIE elements from $_REQUEST
if (count($_COOKIE)) {
    foreach (array_keys($_COOKIE) as $value) {
        unset($_REQUEST[$value]);
    }
}

// Validate email field
if (!empty($_REQUEST['email'])) {
    $_REQUEST['email'] = trim($_REQUEST['email']);
    
    // Use filter_var to validate email
    if (!filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email address is invalid";
    }
}

// Check referrer is from the same site
if (empty($_SERVER['HTTP_REFERER']) || !stristr($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'])) {
    $errors[] = "You must enable referrer logging to use the form";
}

// Check for blank form submission
function recursive_array_check_blank($element_value) {
    global $set;

    if (!is_array($element_value)) {
        if (!empty($element_value)) {
            $set = true;
        }
    } else {
        foreach ($element_value as $value) {
            if ($set) break;
            recursive_array_check_blank($value);
        }
    }
}

recursive_array_check_blank($_REQUEST);

if (!$set) {
    $errors[] = "You cannot send a blank form";
}

unset($set);

// Display errors and exit if any
if (count($errors)) {
    foreach ($errors as $error) {
        echo "$error<br>";
    }
    exit;
}

// Define PHP_EOL if not defined
if (!defined("PHP_EOL")) {
    define("PHP_EOL", strtoupper(substr(PHP_OS, 0, 3)) === "WIN" ? "\r\n" : "\n");
}

// Function to build message content from form data
function build_message($input) {
    $output = '';

    if (!is_array($input)) {
        $output = $input;
    } else {
        foreach ($input as $key => $value) {
            if (!empty($value)) {
                $formatted_key = !is_numeric($key) ? str_replace("_", " ", ucfirst($key)) : $key;
                $output .= $formatted_key . ": " . build_message($value) . PHP_EOL . PHP_EOL;
            }
        }
    }

    return rtrim($output, ", ");
}

$message = build_message($_REQUEST);
$message = stripslashes($message) . PHP_EOL . PHP_EOL . "-- " . PHP_EOL;

// Build email headers
$headers = "";

if ($from_email) {
    $headers .= "From: " . $from_email . PHP_EOL;
    $headers .= "Reply-To: " . $_REQUEST['email'] . PHP_EOL;
} else {
    $from_name = isset($_REQUEST['name']) ? stripslashes($_REQUEST['name']) : '';
    $headers = "From: {$from_name} <{$_REQUEST['email']}>" . PHP_EOL;
}

// Send the email
mail($my_email, $subject, $message, $headers);

?>
