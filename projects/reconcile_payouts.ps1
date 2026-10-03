# ==============================================================================
# LUMEY ENERGY — AUTOMATED TUESDAY COMMISSION RECONCILIATION ENGINE
# ==============================================================================
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\reconcile_payouts.ps1
#
# Generates:
#   1. Detailed terminal reconciliation report
#   2. Bank-ready bulk payout CSV (tuesday_batch_payout.csv)
# ==============================================================================

Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host " LUMEY ENERGY: WEEKLY TUESDAY AFFILIATE COMMISSION RECONCILIATION " -ForegroundColor Yellow
Write-Host " Settlement Cycle Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host ""

# Sample Confirmed Orders Batch for Current Cycle
$SampleOrders = @(
    @{
        OrderNumber = "ORD-2026-0811"
        CustomerName = "Dr. Funke Adeleke"
        CustomerCity = "Victoria Island, Lagos"
        Model = "PowerBox 2600 (Combo)"
        Price = 1000000
        PartnerCode = "LUMEY-CHUKKS"
        PartnerName = "Chukwuma Adebayo"
        PartnerPhone = "08034567890"
        BankName = "GTBank"
        NUBAN = "0128475920"
        Tier = "Pro Partner (10.0%)"
        Rate = 0.10
        IsFirstSale = $false
    },
    @{
        OrderNumber = "ORD-2026-0812"
        CustomerName = "Engr. Musa Haruna"
        CustomerCity = "Maitama, Abuja"
        Model = "PowerBox 1500 (Combo)"
        Price = 500000
        PartnerCode = "LUMEY-AMINA"
        PartnerName = "Amina Bello"
        PartnerPhone = "08149876543"
        BankName = "Access Bank"
        NUBAN = "0039481928"
        Tier = "Active (7.5%)"
        Rate = 0.075
        IsFirstSale = $true
    },
    @{
        OrderNumber = "ORD-2026-0813"
        CustomerName = "Mr. Kenneth Okoro"
        CustomerCity = "Trans-Amadi, Port Harcourt"
        Model = "PowerBox 600 (Combo)"
        Price = 320000
        PartnerCode = "LUMEY-KEMI"
        PartnerName = "Oluwakemi Davies"
        PartnerPhone = "08139743177"
        BankName = "Moniepoint MFB"
        NUBAN = "8139743177"
        Tier = "Starter (5.0%)"
        Rate = 0.05
        IsFirstSale = $true
    }
)

$PayoutBatch = @()
$TotalDisbursement = 0
$TotalOrdersValue = 0

Write-Host "Processing Confirmed Orders for Weekly Cycle..." -ForegroundColor White
Write-Host "-----------------------------------------------------------------" -ForegroundColor Gray

foreach ($order in $SampleOrders) {
    $baseCommission = [math]::Round($order.Price * $order.Rate, 2)
    $bonus = 0
    if ($order.IsFirstSale) {
        $bonus = 5000 # ₦5,000 First-Sale Accelerator Bonus
    }
    $totalPayout = $baseCommission + $bonus

    $TotalOrdersValue += $order.Price
    $TotalDisbursement += $totalPayout

    Write-Host "[OK] Order: $($order.OrderNumber) | Model: $($order.Model)" -ForegroundColor Green
    Write-Host "     Partner: $($order.PartnerName) ($($order.PartnerCode)) - Tier: $($order.Tier)" -ForegroundColor White
    Write-Host "     Base Commission ($($order.Rate * 100)%): NGN $($baseCommission.ToString('N2'))" -ForegroundColor White
    if ($bonus -gt 0) {
        Write-Host "     First-Sale Bonus: +NGN 5,000.00" -ForegroundColor Yellow
    }
    Write-Host "     Total Tuesday Transfer: NGN $($totalPayout.ToString('N2')) -> $($order.BankName) ($($order.NUBAN))" -ForegroundColor Cyan
    Write-Host ""

    $PayoutBatch += [PSCustomObject]@{
        Beneficiary_Name   = $order.PartnerName
        Bank_Name          = $order.BankName
        Beneficiary_NUBAN  = $order.NUBAN
        Amount_NGN         = $totalPayout
        Narration          = "Lumey Payout $($order.PartnerCode)"
        Order_Reference    = $order.OrderNumber
        Date_Queued        = (Get-Date -Format 'yyyy-MM-dd')
    }
}

# Export CSV for Bank Batch Transfer
$CsvOutputPath = Join-Path $PSScriptRoot "tuesday_batch_payout.csv"
$PayoutBatch | Export-Csv -Path $CsvOutputPath -NoTypeInformation -Encoding UTF8

Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host " RECONCILIATION SUMMARY AUDIT " -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host "Total Verified Orders Processed: $($SampleOrders.Count)" -ForegroundColor White
Write-Host "Total Gross Sales Revenue:       NGN $($TotalOrdersValue.ToString('N2'))" -ForegroundColor White
Write-Host "Total Commission & Bonus Payout: NGN $($TotalDisbursement.ToString('N2'))" -ForegroundColor Green
Write-Host "Settlement Efficiency:           $([math]::Round(($TotalDisbursement / $TotalOrdersValue) * 100, 2))% of GMV" -ForegroundColor White
Write-Host ""
Write-Host "Generated Banking Batch File:    $CsvOutputPath" -ForegroundColor Cyan
Write-Host "Ready for Moniepoint / Kuda / Corporate Bank Bulk Upload!" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Yellow
