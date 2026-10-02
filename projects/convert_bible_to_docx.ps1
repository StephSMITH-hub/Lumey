$htmlPath = "c:\Users\Stephycopy\Desktop\Lumey\Lumey_Affiliate_Master_Promotional_Copy_Bible.html"
$docxPath = "c:\Users\Stephycopy\Desktop\Lumey\Lumey_Affiliate_Master_Promotional_Copy_Bible.docx"

Write-Host "Opening Word Application..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = [Microsoft.Office.Interop.Word.WdAlertLevel]::wdAlertsNone

try {
    $doc = $word.Documents.Open($htmlPath)
    Write-Host "Document opened successfully. Saving as DOCX..."
    # wdFormatXMLDocument = 12, wdFormatDocumentDefault = 16
    $doc.SaveAs([ref]$docxPath, [ref]16)
    $doc.Close()
    Write-Host "Saved DOCX: $docxPath"
} catch {
    Write-Error $_
} finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}

Get-Item $docxPath | Select-Object Name, Length, LastWriteTime
