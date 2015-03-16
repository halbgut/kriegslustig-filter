Package.describe({
  name: 'kriegslustig:filter',
  version: '0.0.1',
  summary: 'A reactive interface for complex dynamic mongo selectors based on human created custom content',
  git: 'https://github.com/Kriegslustig/kriegslustig-filter',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2')
  api.use('tracker')
  api.export('KriegslustigFilter', 'client')
  api.addFiles('kriegslustigFilter.js', 'client')
})

Package.onTest(function(api) {
  api.use('tinytest')
  api.use('kriegslustig:filter')
  api.addFiles('kriegslustig:filter-tests.js')
})
