test:
	@node node_modules/lab/bin/lab -v -m 5000 test/unit test/acceptance
test-cov:
	@node node_modules/lab/bin/lab -r lcov

.PHONY: test test-cov
