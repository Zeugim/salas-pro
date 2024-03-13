<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Logout</title>
</head>
<body>
    <h2>Admin Logout</h2>

    <form method="POST" action="{{ route('admin.logout') }}">
        @csrf

        <button type="submit">Logout</button>
    </form>
</body>
</html>