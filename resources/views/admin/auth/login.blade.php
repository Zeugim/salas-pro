<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="d-flex justify-content-center align-items-center py-4 mt-5">
        <div class="text-center">
            <h2>Acceso al panel de administración</h2>
        </div>
    </div>

    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="container d-flex justify-content-center align-items-center mt-5">
        <div class="text-center">
        <div style="background-color: #f5f5f5; border-radius: 10px; padding: 20px;">
    <form method="POST" action="{{ route('admin.login.submit') }}" class="container">
        @csrf

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="{{ old('email') }}" class="form-control" required autofocus>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control" autocomplete="username" required>
        </div>

        <div class="form-group text-center">
            <button type="submit" class="btn btn-primary mt-2">Login</button>
        </div>
    </form>
    </div>
    </div>
    </div>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>