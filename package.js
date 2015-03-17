Package.describe({
  name: 'kriegslustig:filter',
  version: '0.0.1',
  summary: 'A reactive interface for complex dynamic mongo selectors based on human created content',
  git: 'https://github.com/Kriegslustig/kriegslustig-filter',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2')
  api.use('tracker')
  api.export('KriegslustigFilter')
  api.addFiles('kriegslustigFilter.js')
})

Package.onTest(function(api) {
  api.use(['kriegslustig:filter', 'tinytest', 'test-helpers'])
  api.export('KriegslustigFilter', ['client', 'server'])
  api.addFiles('kriegslustigFilter-tests.js', ['client', 'server'])
})
