$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Lumey Affiliate Web App running on http://localhost:8080/"
$root = "c:\Users\Stephycopy\Desktop\Lumey"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $rawUrl = $request.RawUrl.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($rawUrl) -or $rawUrl -eq '/') {
        $rawUrl = "affiliate.html"
    }
    
    if ($rawUrl.Contains('?')) {
        $rawUrl = $rawUrl.Substring(0, $rawUrl.IndexOf('?'))
    }
    
    $filePath = Join-Path $root $rawUrl
    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css" }
            ".js"   { "application/javascript" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".png"  { "image/png" }
            ".pdf"  { "application/pdf" }
            default { "application/octet-stream" }
        }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.OutputStream.Close()
}
