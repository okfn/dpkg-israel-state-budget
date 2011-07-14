from __future__ import print_function

import sys, csv
from datetime import date
import json

import xlrd

def to_float(s):
    if not s:
        return 0.0

    if isinstance(s, (int, float)):
        return float(s)

    if isinstance(s, basestring):
        s = s.replace(',', '')
        s = s.replace(' ', '')
        return float(s)

    raise ValueError("can't handle value: '%s', type: %s" % (s, type(s)))


DATASET_NAME = "israel-state-budget"

book = xlrd.open_workbook(file_contents=sys.stdin.read())
sheet = book.sheet_by_index(0)
print("Number of rows: " + str(sheet.nrows), file=sys.stderr)
entry_id = 0

fieldnames = [
    'year',
    'name',
    'amount',
    'primary',
    'section',
    'entity',
    'programme',
    'concept'
]

writer = csv.DictWriter(sys.stdout, fieldnames)
writer.writeheader()

fmt = u"{name} \u202a({id})\u202c"

for row in range(5, sheet.nrows): # for each row after the header
    l0_id = sheet.cell(row,0).value.strip()
    l0_name = sheet.cell(row,1).value.strip()
    l1_id = sheet.cell(row,2).value.strip()
    l1_name = sheet.cell(row,3).value.strip()
    l2_id = sheet.cell(row,4).value.strip()
    l2_name = sheet.cell(row,5).value.strip()
    l3_id = sheet.cell(row,6).value.strip()
    l3_name = sheet.cell(row,7).value.strip()
    l4_id = sheet.cell(row,8).value.strip()
    l4_name = sheet.cell(row,9).value.strip()

    expenditure_2009 = to_float(unicode(sheet.cell(row,10).value))
    expenditure_2010 = to_float(unicode(sheet.cell(row,15).value))

    for (year, exp) in ((2010, expenditure_2010),
                        (2009, expenditure_2009)):

        e = {
            'amount': exp,
            'name': DATASET_NAME + '-r' + str(entry_id) + "-net" + str(year),
            'year': year,
            'primary':   fmt.format(name=l0_name, id=l0_id).encode('utf8'),
            'section':   fmt.format(name=l1_name, id=l1_id).encode('utf8'),
            'entity':    fmt.format(name=l2_name, id=l2_id).encode('utf8'),
            'programme': fmt.format(name=l3_name, id=l3_id).encode('utf8'),
            'concept':   fmt.format(name=l4_name, id=l4_id).encode('utf8')
        }

        writer.writerow(e)

        entry_id += 1

